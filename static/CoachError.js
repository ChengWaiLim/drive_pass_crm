class CoachError {
    static text(code) {
        var message = CoachError.MESSAGE[code]
        return message != null ? message : code
    }
}

CoachError.COACH_NAME_INVALID = "COACH_NAME_INVALID"
CoachError.PHONE_INVALID = "PHONE_INVALID"
CoachError.LICENSE_INVALID = "LICENSE_INVALID"
CoachError.AREA_INVALID = "AREA_INVALID"
CoachError.LANGUAGE_INVALID = "LANGUAGE_INVALID"
CoachError.PRICE_INVALID = "PRICE_INVALID"

CoachError.MESSAGE = {
    [CoachError.COACH_NAME_INVALID]: "Coach Name Invalid",
    [CoachError.PHONE_INVALID]: "Phone Invalid",
    [CoachError.LICENSE_INVALID]: "License Invalid",
    [CoachError.AREA_INVALID]: "Area Invalid",
    [CoachError.LANGUAGE_INVALID]: "Language Invalid",
    [CoachError.PRICE_INVALID]: "Price Invalid",
}

export default CoachError
