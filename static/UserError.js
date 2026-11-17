class UserError {
    static text(code) {
        var message = UserError.MESSAGE[code]
        return message != null ? message : code
    }
}

UserError.USERNAME_INVALID = "USERNAME_INVALID"
UserError.PHONE_INVALID = "PHONE_INVALID"
UserError.HKID_INVALID = "HKID_INVALID"
UserError.ADDRESS_INVALID = "ADDRESS_INVALID"

UserError.MESSAGE = {
    [UserError.USERNAME_INVALID]: "Username Invalid",
    [UserError.PHONE_INVALID]: "Phone Invalid",
    [UserError.HKID_INVALID]: "HKID Invalid",
    [UserError.ADDRESS_INVALID]: "Address Invalid",
}

export default UserError
