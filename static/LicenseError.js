class LicenseError {
    static text(code) {
        var message = LicenseError.MESSAGE[code]
        return message != null ? message : code
    }
}

LicenseError.CODE_INVALID = "CODE_INVALID"
LicenseError.NAME_ZH_INVALID = "NAME_ZH_INVALID"
LicenseError.NAME_CN_INVALID = "NAME_CN_INVALID"
LicenseError.NAME_EN_INVALID = "NAME_EN_INVALID"

LicenseError.MESSAGE = {
    [LicenseError.CODE_INVALID]: "代碼無效",
    [LicenseError.NAME_ZH_INVALID]: "繁體名稱無效",
    [LicenseError.NAME_CN_INVALID]: "簡體名稱無效",
    [LicenseError.NAME_EN_INVALID]: "英文名稱無效",
}

export default LicenseError
