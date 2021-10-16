const rewire = require("rewire")
const prop_switcher = rewire("./prop-switcher")
const dequotify = prop_switcher.__get__("dequotify")
const quotify = prop_switcher.__get__("quotify")
// @ponicode
describe("dequotify", () => {
    test("0", () => {
        let callFunction = () => {
            dequotify("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            dequotify("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            dequotify("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            dequotify(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("quotify", () => {
    test("0", () => {
        let callFunction = () => {
            quotify(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            quotify(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            quotify(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
