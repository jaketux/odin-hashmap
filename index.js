


function createHashMap(){

    let loadfactor = 0.75
    let currentload = 0
    let capacity = 0

    let buckets = new Array(16)

    class ListNode {
    constructor (key,value){
        this.key = key
        this.value = value
        this.next = null
    }
    }

    class LinkedList {
        constructor(){
            this.head = null;
        }
    
        size() {
            let count = 0
            let node = this.head
            while (node){
                count ++
                node = node.next
            }
            return count
        }
        
        append(listItem){

            if (!(listItem instanceof ListNode)){
                throw new Error("Only instances of ListItem can be appended.")
            }
            
            if(this.head === null){
                this.head = listItem
                } else {
                let current = this.head;
                while (current.next){
                    current = current.next;
                }
            current.next = listItem
            }
        }

        prepend(listItem){
            if (this.size() === 0){
                this.head = listItem
            } else {
            listItem.next = this.head
            this.head = listItem
            }
        }

    }

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
      } 

    function set(key, value){
        //if key already exists, then value is overwritten/updated
        //
        let hashedKey = hash(key)
        let index = hashedKey % buckets.length
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
          } else if (buckets[index] instanceof LinkedList){
            let list = new LinkedList()
            let listItem = new ListNode(key,value)
            list.prepend(listItem)
            buckets[index] = list
            console.log(buckets)
        } else if (buckets[index] === null || buckets[index] === undefined){
            let list = new LinkedList()
            let listItem = new ListNode(key,value)
            list.prepend(listItem)
            buckets[index] = list
            currentload++
            console.log(index)
            console.log(buckets)
            console.log(capacity)
        }
    }

    function get(key){

        let hashedKey = hash(key)
        let index = hashedKey % buckets.length
        let bucket = buckets[index]
        if (bucket instanceof LinkedList){
            let current = bucket.head
            while (current) {
                if (current.key === key){   
                    console.log(current.value)
                    return current.val
                } 
                current = current.next 
                }
            }
            return null
    }

    function has(key){

        let hashedKey = hash(key)
        let index = hashedKey % buckets.length
        let bucket = buckets[index]
        if (bucket instanceof LinkedList){
            let current = bucket.head
            while (current) {
                if (current.key === key){   
                    console.log("true")
                    return true
                } 
                current = current.next 
                }
            }
            console.log("false")
            return false
    }

    return {hash,set,get,has}
}

const hashMap = createHashMap()


hashMap.set("Boris","Loves to count")
hashMap.set("Boris","Half a programmer")
hashMap.set("Boris","Has the sports almanac")
hashMap.set("Boris","Another attempt")
hashMap.set("Boris","Just a chill guy")


hashMap.set("Johnathan","Shave those sideburns")
hashMap.set("Drew","Just a chill guy")

hashMap.get("Johnathan")
hashMap.get("Drew")

hashMap.has("Lesboyd")

