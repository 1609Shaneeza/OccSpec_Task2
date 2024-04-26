import datetime
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from sqlite3 import Error
import json
from bcrypt import checkpw, gensalt, hashpw
from datetime import datetime as dt
from cryptography.fernet import Fernet




with open ("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\Task2_Json.json", "r") as file:
    j = json.loads(file.read())


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


################################################################################################
### Login for Customers and Staff
logins = {}
@app.route('/Login', methods=['POST'])
def login_details():
    print("Request received.")
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
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
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
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
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
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

#Email Check For Ticket Booking
#this sections checks whether the email inputted by the user exists in the database

@app.route('/EmailCheckTicketsBooking', methods=['POST'])
def EmailCheckTickets():
     with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
        try:
            print("request recieved")
            Email = request.json.get('Email')
            query = """Select Email From CustomerDetails Where Email = ?"""
            cu = conn.cursor()
            cu.execute(query,(Email,))
            result = cu.fetchall()
            print(Email)
            if result:
                print("Email Exists")
                return jsonify({'message': 'Email exists', 'success': True })
            else:
                print("Email Doesnot exists")
                return jsonify({'message':'Email Doesnot Exists', 'success': False})
        except Error as e:
            print(e)

################################################################################################

@app.route('/TicketBookings', methods=['POST'])
def Ticket_Booking():
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
        print("Request Recieved")
        Email = request.json.get('Email')
        EdVisit = request.json.get('EdVisit')
        dateVisiting = request.json.get('DateVisiting')
        NumOfChildren = request.json.get('numberOfChildren')
        NumOfAdults = request.json.get('NumberOfAdults')
        DateOfPayment = request.json.get('DateOfPayment')
        print(dateVisiting)
        try:
            cu = conn.cursor()
            query = """Select CustomerID From CustomerDetails Where Email = ?"""
            cu.execute(query,(Email,))
            result = cu.fetchall()
            CustomerID = result[0][0]
            query = """Select * From PaymentInfo Where CustomerID = ?"""
            cu.execute(query,(CustomerID,))
            result = cu.fetchall()
            PaymentID = result[0][0]
            CustID = result[0][3]
            query = """Select * From TicketBookings Where PaymentID = ?"""
            cu.execute(query,(PaymentID,))
            result = cu.fetchall()
            for i in result:
                print(i)
                Customer_ID = i[1]
                print(Customer_ID)
                Date_Visiting = i[4]
                print(Date_Visiting)
                if CustomerID == Customer_ID and dateVisiting == Date_Visiting:
                    return jsonify ({'success': False, 'Message': 'Booking already exists'})
                else:
                    print("working")
                    print(CustomerID)
                    print(CustID)
                    if CustomerID == CustID:
                        print(CustomerID)
                        TotalCost = (NumOfChildren * 10) + (NumOfAdults * 20)
                        NumOfPeople = NumOfChildren + NumOfAdults
                        print(dateVisiting)
                        entry = """Insert Into TicketBookings(CustomerID, NumberPeople, NumberOfChildren, DateVisiting, TotalCost, EducationalVisit, PaymentID) values (?,?,?,?,?,?,?)"""
                        cu.execute(entry, (CustomerID, NumOfPeople, NumOfChildren, dateVisiting, TotalCost, EdVisit, PaymentID))
                        conn.commit()
                        return jsonify ({'success': True, 'Message': 'Booking Successful'})
                    else:
                        print("Payment not completed")
                        return jsonify ({'success': False, 'Message': 'Payment not completed'})
            else:
                if CustomerID == CustID:
                    print(CustomerID)
                    TotalCost = (NumOfChildren * 10) + (NumOfAdults * 20)
                    NumOfPeople = NumOfChildren + NumOfAdults
                    print(dateVisiting)
                    entry = """Insert Into TicketBookings(CustomerID, NumberPeople, NumberOfChildren, DateVisiting, TotalCost, EducationalVisit, PaymentID) values (?,?,?,?,?,?,?)"""
                    cu.execute(entry, (CustomerID, NumOfPeople, NumOfChildren, dateVisiting, TotalCost, EdVisit, PaymentID))
                    conn.commit()
                    return jsonify ({'success': True, 'Message': 'Booking Successful'})
                else:
                    print("Payment not completed")
                    return jsonify ({'success': False, 'Message': 'Payment not completed'})
        except Error as e:
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500

#######################################################################################################

@app.route('/Checkout', methods=['POST'])
def Payment_Details():
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
        print("Request Recieved")
        name = request.json.get('name')
        Email = request.json.get('Email')
        cardNumber = request.json.get('cardNumber')
        ExpDate = request.json.get('expDate')
        cvc = request.json.get('cvc')
        DateOfPayment = request.json.get('DateOfPayment')
        try:
            cu = conn.cursor()
            query = """Select * From CardDetails Where NameOnCard = ?"""
            cu.execute(query,(name,))
            result = cu.fetchall()
            print(result)
            for i in result:
                print(result)
                Key = i[6]
                print(Key)
                f = Fernet(Key)
                CrdNumber = i[2]
                CardNumberr = f.decrypt(CrdNumber)
                CardNumber_str = CardNumberr.decode()
                print(CardNumber_str)
                if CardNumber_str == cardNumber:
                    DetailsId = i[0]
                    query = """Select CustomerID From CustomerDetails Where Email = ?"""
                    cu.execute(query,(Email,))
                    result = cu.fetchall()
                    CustomerID = result[0][0]
                    entry = """Insert Into PaymentInfo(DetailsID, PaymentDate, CustomerID) values(?,?,?)"""
                    cu.execute(entry, (DetailsId, DateOfPayment, CustomerID))
                    conn.commit()
                    return jsonify ({'success': True, 'message': 'Payment Successful'})
                else:
                    return jsonify ({'success': True, 'message': 'Payment Not Successful'})
            else:
                key = Fernet.generate_key()
                f = Fernet(key)
                CardNumber = f.encrypt(cardNumber.encode())
                ExpiryDate = f.encrypt(ExpDate.encode())
                CVVNumber = f.encrypt(cvc.encode())
                query = """Select CustomerID From CustomerDetails Where Email = ?"""
                cu.execute(query,(Email,))
                result = cu.fetchall()
                CustomerID = result[0][0]
                entry = """Insert Into CardDetails(NameOnCard, CardNumber, ExpiryDate, CVV, CustomerID, Key) values (?,?,?,?,?,?)"""
                cu.execute(entry, (name, CardNumber, ExpiryDate, CVVNumber, CustomerID, key))
                conn.commit()
                query = """Select * From CardDetails Where NameOnCard = ?"""
                cu.execute(query,(name,))
                result = cu.fetchall()
                Key = result[0][6]
                f = Fernet(Key)
                CrdNumber = result[0][2]
                CardNumberr = f.decrypt(CrdNumber)
                CardNumber_str = CardNumberr.decode()
                if CardNumber_str == cardNumber:
                    DetailsId = result[0][0]
                    entry = """Insert Into PaymentInfo(DetailsID, PaymentDate, CustomerID) values(?,?,?)"""
                    cu.execute(entry, (DetailsId, DateOfPayment, CustomerID))
                    conn.commit()
                    return jsonify ({'success': True, 'message': 'Payment Successful'})
                else:
                    return jsonify ({'success': False, 'message': 'Data doesnot match'})

        except Error as e:
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500
            
                
            return jsonify({'success': False, 'message': 'Card number does not match for the provided name'}), 400
            
        except Error as e:
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500

########################################################################################################

#this is the Check Availability Section 
# it checks in the Room bookings table if there are any rooms available for the days entered by the user
#this code is the same as the ticket booking where it check if the email address exists

@app.route('/CheckAvailabilityEmailCheck', methods=['POST'])
def Availability_EmailCheck():
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
        print("Request Recieved")
        try:
            Email = request.json.get('Email')
            query = """Select Email From CustomerDetails Where Email = ?"""
            cu = conn.cursor()
            cu.execute(query,(Email,))
            result = cu.fetchall()
            print(Email)
            if result:
                print("Email Exists")
                return jsonify({'message': 'Email exists', 'success': True })
            else:
                print("Email Doesnot exists")
                return jsonify({'message':'Email Doesnot Exists', 'success': False})
        except Error as e:
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500


########################################################################################
# This part of the code is for the checkavailability it checks for rooms that are available
# It checks if there are any bookings for rooms on the dates given
#If there are rooms available it then returns them in a list to display on the website

@app.route('/RoomDataDisplay', methods=['POST'])
def DataDisplay():
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
        print("Request Recieved")
        StartDate_str = request.json.get('StartDate')
        EndDate_str = request.json.get('EndDate')
        print(StartDate_str)
        try:
            cu = conn.cursor()
            query = """Select * From RoomBookings"""
            cu.execute(query)
            result = cu.fetchall()
            print(result)
            RoomsList = []
            if result == []:
                query = """Select * From RoomTypes"""
                cu.execute(query)
                result = cu.fetchall()
                for i in result:
                    RoomType = i[1]
                    Price = i[2]
                    Availability = i[3]
                    Capacity = i[4]
                    URL = i[5]
                    json = {
                        "RoomType":RoomType,
                        "Price": Price,
                        "Availability": Availability,
                        "Capacity": Capacity,
                        "URL": URL,
                    }
                    RoomsList.append(json)
                return jsonify ({"DisplayData": RoomsList})
            else:
                StartDate_iso = StartDate_str.split("T")[0]
                EndDate_iso = EndDate_str.split("T")[0]
                # Convert StartDate and EndDate strings to datetime objects
                StartDate = dt.strptime(StartDate_iso, "%Y-%m-%d").strftime("%d/%m/%Y")
                EndDate = dt.strptime(EndDate_iso, "%Y-%m-%d").strftime("%d/%m/%Y")
                startDate = dt.strptime(i[4], "%Y-%m-%d")
                endDate = dt.strptime(i[5], "%Y-%m-%d")
                print(startDate, endDate)
                if (startDate <= StartDate <= endDate) or (startDate <= EndDate <= endDate) or (StartDate <= startDate and endDate <= EndDate):
                    print("No rooms Available")
                    return jsonify({'message': 'Rooms Not Available'})
                else:
                    roomType = result[0][1]
                    print(roomType)
                    query = """Select * From RoomTypes Where RoomID = ?"""
                    cu.execute(query,(roomType,))
                    result = cu.fetchall()
                    for i in result:
                        RoomType = i[1]
                        Price = i[2]
                        Availability = i[3]
                        Capacity = i[4]
                        URL = i[5]
                        json = {
                            "RoomType":RoomType,
                            "Price": Price,
                            "Availability": Availability,
                            "Capacity": Capacity,
                            "URL": URL,
                        }
                        RoomsList.append(json)
                    return jsonify ({"DisplayData": RoomsList})
            
        except Error as e:
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500


#######################################################################################
#This card of the code checks for the list the user has selected and checks for it in the database and returns 

@app.route('/RoomSummaryDisplay', methods=['POST'])
def RoomDataDisplay():
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
        print("Request Received")
        RoomType = request.json.get('RoomType')
        room_types_list = list(RoomType.keys())
        try:
            print("Working")
            cu = conn.cursor()
            RoomsList = []
            for roomType in RoomType.items():
                roomsTypes = roomType[0]
                query = """SELECT * FROM RoomTypes WHERE RoomType = ?"""
                cu.execute(query, (roomsTypes,))
                result = cu.fetchall()
                print(result)
                if result:
                    for i in result:
                        RoomType = i[1]
                        Price = i[2]
                        Availability = i[3]
                        Capacity = i[4]
                        URL = i[5]
                        json = {
                            "RoomType": RoomType,
                            "Price": Price,
                            "Availability": Availability,
                            "Capacity": Capacity,
                            "URL": URL,
                        }
                        RoomsList.append(json)
                else:
                    # Handle the case where the room type does not exist in the database
                    error_json = {
                        "RoomType": roomsTypes,
                        "Price": "N/A",
                        "Availability": "N/A",
                        "Capacity": "N/A",
                        "URL": "N/A",
                    }
                    RoomsList.append(error_json)
            return jsonify({"result": RoomsList})
        except Error as e:
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500
        
###############################################################################################

##Checks if the user has selected some Rooms fto book

@app.route('/RoomDataCheck', methods=['POST'])
def RoomDataCheck():
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
        print("Request Received")
        RoomType = request.json.get('RoomType')
        room_types_list = list(RoomType.keys())
        print("request recieved")
        print(RoomType)
        if RoomType == []:
            print("No rooms Selected")
            return jsonify ({'success': False, 'message':'No Rooms Selected'})
        else:
            print("Rooms Selected")
            return jsonify ({'success': True, 'message':'Rooms Se'})



###############################################################################################
##Add Room Booking to Database

@app.route('/RoomBookingAddedToDatabase', methods=['POST'])
def RoomsBookings():
    with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
        print("Request Received")
        Email = request.json.get('Email')
        NumberOfGuests = request.json.get('NumberOfGuests')
        NumberOfRooms = request.json.get('NumberOfRooms')
        CheckInDate = request.json.get('CheckInDate')
        CheckOutDate = request.json.get('CheckOutDate')
        RoomType = request.json.get('RoomType')
        room_types_list = list(RoomType.keys())
        try:
            cu = conn.cursor()
            query = """Select CustomerID From CustomerDetails Where Email = ?"""
            cu.execute(query,(Email,))
            result = cu.fetchall()
            CustomerID = result[0][0]
            query = """Select * From PaymentInfo Where CustomerID = ?"""
            cu.execute(query,(CustomerID,))
            result = cu.fetchall()
            PaymentID = result[0][0]
            print(PaymentID)
            CustID = result[0][3]
            for roomType in RoomType.items():
                roomsTypes = roomType[0]
                query = """SELECT RoomID FROM RoomTypes WHERE RoomType = ?"""
                cu.execute(query, (roomsTypes,))
                result = cu.fetchall()
                RoomID = result[0][0]
                print(RoomID)
                entry = """Insert Into RoomBookings(RoomID, CustomerID, NumberOfRooms, DateFrom, DateTo, PaymentID) values(?,?,?,?,?,?)"""
                cu.execute(entry, (RoomID, CustomerID, NumberOfRooms, CheckInDate, CheckOutDate, PaymentID))
                conn.commit()
                return jsonify ({'message': 'Booking Confirmed', 'success': True})
        except Error as e:
            print(e)
            return jsonify({'success': False, 'message': 'Internal Server Error'}), 500
        

##############################################################################################

#Room Checkout








###########################################################################################
#This code Adds staff to the Database

# @app.route('/AddingStaff', methods=['POST'])
# def Adding_Staff():
#     with sqlite3.connect("C:\\Users\\shane\\OneDrive\\Documents\\OccupationalSpecialism_Task2\\Task2_backend\\RZADatabase.db") as conn:
#         print("Request Recieved")
#         StaffName = request.json.get('StaffName')
#         StaffSurname = request.json.get('StaffSurname')
#         StaffDOB = request.json.get('StaffDOB')
#         StaffRole = request.json.get('StaffRole')
#         StaffEmail = request.json.get('StaffEmail')
#         StaffUsername = request.json.get('StaffUsername')
#         if StaffUsername.isalnum and len(StaffUsername) in range(5,16):
#             password = request.json.get('Password')
#             passwords = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@#$%^_&-+=]+){5,16}$"
#             if re.match(passwords, password):
#                 passwordEncode = password.encode("UTF-8")
#                 confirmPassword = request.json.get('ConfirmPassword').encode("UTF-8")
#             else:
#                 return jsonify({'message':'Password not strong enough'})
#         else:
#             return jsonify({'message': 'Username must be between 5 to 16 characters'})
#         confirmPassword = request.json.get('ConfirmPassword').encode("UTF-8")
#         try:
#             cu = conn.cursor()
#             query = """Select Username From CustomerDetails where Username = ?"""
#             cu.execute(query, (StaffUsername,))
#             result = cu.fetchall()
#             if len(result) > 0:
#                 return jsonify({'message': 'Account already exists'})
#             else:
#                 if passwordEncode == confirmPassword:
#                     salt = gensalt()
#                     hashedPassword = hashpw(passwordEncode, salt)
#                     entry = """Insert Into StaffDetails(StaffName, StaffSurname, DOB, Email, StaffRole, Username, Password) Values(?,?,?,?,?,?,?)"""
#                     cu.execute(entry, (StaffName, StaffSurname, StaffDOB, StaffEmail, StaffRole, StaffUsername, hashedPassword))
#                     conn.commit()
#                     return jsonify({'Success':True, 'message': 'Account Created'})
#                 else:
#                     return jsonify({'Success':False,'message': 'Passwords do not match'})
#         except Error as e:
#             print("Error here.")
#             print(e)
#             return jsonify({'success': False, 'message': 'Internal Server Error'}), 500


if __name__ == "__main__":
    app.run()
