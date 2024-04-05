import datetime
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from sqlite3 import Error
import json
from bcrypt import checkpw, gensalt, hashpw
from datetime import datetime as dt




with open ("Task2_backend\Task2.json", "r") as file:
    j = json.loads(file.read())

print(j)


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


################################################################################################
### Login for Customers and Staff
logins = {}
@app.route('/Login', methods=['POST'])
def login_details():
    print("Request received.")
    with sqlite3.connect("Task2_backend\RZADatabase.db") as conn:
        if request.method == 'POST':
            Email = request.json.get('Email')
            password = request.json.get('Password').encode("UTF-8")
            Role = "Customer"
            
        try:
            cu = conn.cursor()
            query1 = """Select Email, Password From StaffDetails Where Email = ?"""
            query2 = """Select Email, Password From CustomerDetails Where Email = ?"""
            Staff = cu.execute(query1,(Email,))
            StaffResult = Staff.fetchall()
            Customer = cu.execute(query2,(Email,))           
            CustomerResult = Customer.fetchall()         
            for i in StaffResult or CustomerResult:
                logins[i[0]] = i[1]
                if i in StaffResult:
                    if Email in logins:
                        savedPassword = logins[Email]
                        if checkpw(password, savedPassword):
                            query = """Select Email, Role From StaffDetails Where Email = ?"""
                            cu.execute(query,(Email,))
                            result = cu.fetchall()
                            print(result)
                            for i in result:
                                Role = i[1]
                                query = """Select Role, [RoleID] From StaffRoles Where RoleID = ?"""
                                cu.execute(query,(Role,))
                                result = cu.fetchall()
                                for i  in result:
                                    roleStaff = i[0]
                                    if roleStaff == "Admin":
                                        Role = "Admin"
                                        print(Role)
                                        return jsonify({'success': True, 'message': 'Login successful', 'Account':False, 'Role': Role})          
                                Role = "Staff"
                                print(Role)
                                return jsonify({'success': True, 'message': 'Login successful', 'Account':False, 'Role': Role})
                        else:
                            return jsonify({'success': False, 'message': 'Incorrect login details'})
                    else:
                        return jsonify({'success': False, 'message': 'Username doesnot exists'})
                elif i in CustomerResult:
                    if Email in logins:
                        savedPassword = logins[Email]
                        if checkpw(password, savedPassword):
                            Role = "Customer"
                            print(Role)
                            return jsonify({'success': True, 'message': 'Login successful', 'Account': True, 'Role': Role})
                        else:
                            return jsonify({'success': False, 'message': 'Incorrect login details'})
                    else:
                        return jsonify({'success': False, 'message': 'Username doesnot exists'})
                else:
                    print("Account doesnot exists")
                    return jsonify({'message': 'Account doesnot exists'})

        except Error as e:
            print("Error here.")
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500



####################################################################################################### 
#Customer signup
@app.route('/SignUp', methods=['POST'])
def Customer_SignUp():
    with sqlite3.connect("Task2_backend\RZADatabase.db") as conn:
        print("Request Recieved")
        Name = request.json.get('Name')
        Surname = request.json.get('Surname')
        Email = request.json.get('Email')
        password = request.json.get('Password')
        passwords = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@#$%^_&-+=]+){5,16}$"
        if re.match(passwords, password):
            passwordEncode = password.encode("UTF-8")
            confirmPassword = request.json.get('ConfirmPassword').encode("UTF-8")
        else:
            return jsonify({'message':'Password not strong enough'})
        confirmPassword = request.json.get('ConfirmPassword').encode("UTF-8")
        try:
            cu = conn.cursor()
            query = """Select Email From CustomerDetails Where Email = ?"""
            cu.execute(query, (Email,))
            result = cu.fetchall()
            if len(result) > 0:
                return jsonify({'message': 'Account already exists'})
            else:
                if passwordEncode == confirmPassword:
                    salt = gensalt()
                    hashedPassword = hashpw(passwordEncode, salt)
                    entry = """Insert Into CustomerDetails(Name, Surname, Email, Password) Values(?,?,?,?)"""
                    cu.execute(entry, (Name, Surname, Email, hashedPassword))
                    conn.commit()
                    return jsonify({'message': 'Account Created'})
                else:
                    return jsonify({'message': 'Passwords do not match'})
        except Error as e:
            print("Error here.")
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500
        
###########################################################################################################


#PreOrder Menu
@app.route('/EducationalMaterials', methods=['GET'])
def EducationalMaterials():
    with sqlite3.connect("Task2_backend\RZADatabase.db") as conn:
        try:
            query = """Select * From EducationalMaterials"""
            cu = conn.cursor()
            cu.execute(query)
            result = cu.fetchall()
            MaterialsList = []
            for i in result:
                Title = i[1]
                Description = i[2]
                Url = i[3]
                Habitat = i[4]
                Conservation = i[5]
                json = {
                    "Title": Title,
                    "Description": Description,
                    "Url": Url,
                    "Habitat": Habitat,
                    "Conservation": Conservation,
                }
                MaterialsList.append(json)
            return jsonify({"result":MaterialsList})
        except Error as e:
            print(e)


###################################################################################################
        

if __name__ == "__main__":
    app.run()
