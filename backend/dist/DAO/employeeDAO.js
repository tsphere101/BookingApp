"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
class Employee {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   console.log(req.body);
                const { firstname, lastname, email, username, password } = req.body;
                if (!(firstname && lastname && email && username && password)) {
                    res.status(400).send("All input required");
                }
                const oldStaff = yield staffModel.findOne({ email });
                if (oldStaff) {
                    return res.status(409).send("This staff already exist. Please login");
                }
                const encrytedPassword = yield bcrypt.hash(password, 10);
                // const brithDate = new Date(birthdate)
                const staff = new staffModel({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    password: encrytedPassword,
                });
                const token = jsonwebtoken.sign({ staff_id: staff.id, email }, process.env.TOKEN_KEY, { expiresIn: "2d" });
                staff.token = token;
                staff.save();
                const result = staff.toObject();
                delete result.password;
                result.isStaff = true;
                res.status(201).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!(username && password)) {
                    res.status(400).send("All input required");
                }
                //check is user input username or email
                let staff = Object;
                if (username.includes("@")) {
                    staff = yield staffModel.findOne({ email: username });
                }
                else {
                    staff = yield staffModel.findOne({ username: username });
                }
                if (staff === null) {
                    res.status(400).send("username not found");
                    return;
                }
                const email = staff.email;
                if (staff && (yield bcrypt.compare(password, staff.password))) {
                    const token = jsonwebtoken.sign({ staff_id: staff._id, email }, process.env.TOKEN_KEY, {
                        expiresIn: "2d",
                    });
                    staff.token = token;
                    staff.save();
                    const result = staff.toObject();
                    delete result.password;
                    result.isStaff = true;
                    res.status(201).json(result);
                }
                else {
                    res.status(400).send("Invalid login");
                }
            }
            catch (err) {
                console.log(err);
                res.send("error in backend");
            }
        });
    }
}
