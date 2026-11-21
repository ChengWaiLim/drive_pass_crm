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
    [CoachError.COACH_NAME_INVALID]: "師傅名稱無效",
    [CoachError.PHONE_INVALID]: "電話號碼無效",
    [CoachError.LICENSE_INVALID]: "牌照無效",
    [CoachError.AREA_INVALID]: "地區無效",
    [CoachError.LANGUAGE_INVALID]: "語言無效",
    [CoachError.PRICE_INVALID]: "價格無效",
}

export default CoachError
