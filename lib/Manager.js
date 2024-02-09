// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
//import the parent class
const Employee = require('./Employee');

//create the subclass

class Manager extends Employee {
    constructor(name,id,email,officeNumber) {
        super(name,id,email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
    
    getRole() {
        return 'Manager';
    }
}

module.exports = Manager;
