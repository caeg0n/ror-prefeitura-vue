const strMixins = {
    data() {
        return {
        }
    },

    methods: {


        mySort: function (key, order = 'asc') {
            //como usar
            //<template v-for="user in users.sort(this.mySort('name','asc'))">
            return function innerSort(a, b) {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    return 0
                }
                const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
                const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
                let comparison = 0
                if (varA > varB) {
                    comparison = 1
                } else if (varA < varB) {
                    comparison = -1
                }
                return (
                    (order === 'desc') ? (comparison * -1) : comparison
                )
            }   
            
        },

        capitalLetter: function (str) {
            try {
                if (!(str==='undefined')){
                    str = str.split(" ")
                    for (let i = 0, x = str.length; i < x; i++) {
                        str[i] = str[i][0].toUpperCase() + str[i].substr(1)
                    }
                    return str.join(" ")
                }
            }catch (e) {
                return ""
            }
        }

    }
}
export default strMixins

