class ExamAddressError {
    static text(code) {
        var message = ExamAddressError.MESSAGE[code]
        return message != null ? message : code
    }
}

ExamAddressError.ADDRESS_CODE_INVALID = "ADDRESS_CODE_INVALID"
ExamAddressError.DISTRICT_ZH_INVALID = "DISTRICT_ZH_INVALID"
ExamAddressError.DISTRICT_CN_INVALID = "DISTRICT_CN_INVALID"
ExamAddressError.DISTRICT_EN_INVALID = "DISTRICT_EN_INVALID"
ExamAddressError.ADDRESS_ZH_INVALID = "ADDRESS_ZH_INVALID"
ExamAddressError.ADDRESS_CN_INVALID = "ADDRESS_CN_INVALID"
ExamAddressError.ADDRESS_EN_INVALID = "ADDRESS_EN_INVALID"

ExamAddressError.MESSAGE = {
    [ExamAddressError.ADDRESS_CODE_INVALID]: "地址代碼無效",
    [ExamAddressError.DISTRICT_ZH_INVALID]: "繁體地區無效",
    [ExamAddressError.DISTRICT_CN_INVALID]: "簡體地區無效",
    [ExamAddressError.DISTRICT_EN_INVALID]: "英文地區無效",
    [ExamAddressError.ADDRESS_ZH_INVALID]: "繁體地址無效",
    [ExamAddressError.ADDRESS_CN_INVALID]: "簡體地址無效",
    [ExamAddressError.ADDRESS_EN_INVALID]: "英文地址無效",
}

export default ExamAddressError
