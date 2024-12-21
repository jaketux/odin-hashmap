


function createHashMap(){

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

    let loadfactorthreshold = 0.75
    let capacity = 0

    function currentLoad(){
        let count = 0
        for (i = 0; i<buckets.length;i++){
            if (buckets[i] instanceof LinkedList){
                let current = buckets[i].head
                while (current){
                count++
                current = current.next
                }
            }
        }
        let loadFactor = count/buckets.length
        console.log("Current load factor is: "+loadFactor)
        return loadFactor>loadfactorthreshold
    }
    
    let currentload = currentLoad()

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
      } 

    function set(key, value){

        let hashedKey = hash(key)
        let index = hashedKey % buckets.length
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
          } else if (buckets[index] instanceof LinkedList){
                let current = buckets[index].head
                while (current) {
                    //if linked list exists and the key is the same, update it. 
                    if (current.key === key){   
                        current.value = value
                        return current.value
                    } 
                    current = current.next 
                }

                // If key doesn't exist, insert a new node at the front
                let listItem = new ListNode(key,value)
                listItem.next = buckets[index].head
                buckets[index].head = listItem

        } else if (buckets[index] === null || buckets[index] === undefined){
            //if linked list does not exist, make a new linked list
            let list = new LinkedList()
            let listItem = new ListNode(key,value)
            list.prepend(listItem)
            buckets[index] = list
            currentload++
            console.log(index)
            console.log(buckets)
            console.log(capacity)
        }
        if (currentLoad()){
            resize()
        }
    }
    
    function resize(){
        let newCapacity = buckets.length*2
        let newBuckets = new Array(newCapacity)
        for (i=0;i<newBuckets.length;i++){
            if (buckets[i] instanceof LinkedList){
                let current = buckets[i].head
                while (current){
                    let newIndex = hash(current.key)%newCapacity
                    if (!newBuckets[newIndex]){
                        newBuckets[newIndex] = new LinkedList()
                    }
                    let newNode = new ListNode(current.key, current.value)
                    newNode.next = newBuckets[newIndex].head
                    newBuckets[newIndex].head = newNode
                    current=current.next
                }
            }
        }
        buckets = newBuckets
        console.log(newBuckets)
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

    function remove(key){

        let hashedKey = hash(key)
        let index = hashedKey % buckets.length
        let bucket = buckets[index]
        if (bucket instanceof LinkedList){
            let current = bucket.head;
            let previous = null;
            while (current) {
                if (current.key === key){
                    if (previous === null) {
                        bucket.head = current.next}
                    else {
                        previous.next = current.next 
                    }
                    console.log("Item removed successfully")
                    console.log(buckets)
                    return true;
                }

                previous = current;
                current = current.next;

            }
            console.log("Key not found")
            return false
        }
        console.log("Bucket is not a linked list")
        returnfalse
    }   

    function length(){
        let count = 0
        for (i = 0; i<buckets.length;i++){
            if (buckets[i] instanceof LinkedList){
                let current = buckets[i].head
                while (current){
                    if (current.key){
                        count++ 
                        current = current.next
                    } else{
                        current = current.next
                    }
                }
            }
        }
        console.log(count)
        return count
    }

    function clear(){
        let buckets = new Array(16)
        console.log(buckets)

    }

    function keys(){
        let listOfKeys = []
        for (i = 0; i<buckets.length;i++){
            if (buckets[i] instanceof LinkedList){
                let current = buckets[i].head
                while (current){
                    if (current.key){
                        listOfKeys.push(current.key)
                        current = current.next
                    } else{
                        current = current.next
                    }
                }
            }
        }
        console.log(listOfKeys)
        return listOfKeys
    }

    function values(){
        let listOfValues = []
        for (i = 0; i<buckets.length;i++){
            if (buckets[i] instanceof LinkedList){
                let current = buckets[i].head
                while (current){
                    if (current.value){
                        listOfValues.push(current.value)
                        current = current.next
                    } else{
                        current = current.next
                    }
                }
            }
        }
        console.log(listOfValues)
        return listOfValues
    }

    function entries(){
        let listOfEntries = []
        for (i = 0; i<buckets.length;i++){
            if (buckets[i] instanceof LinkedList){
                let current = buckets[i].head
                while (current){
                    if (current.key){
                        let keyValuePair = []
                        keyValuePair.push(current.key)
                        keyValuePair.push(current.value)
                        listOfEntries.push(keyValuePair)
                        current = current.next
                    } else{
                        current = current.next
                    }
                }
            }
        }
        console.log(listOfEntries)
        return listOfEntries
    }



    return {hash,set,get,has,remove,length, clear, keys, values, entries, currentLoad}

}

const hashMap = createHashMap()

hashMap.set('apple', 'yellow')
hashMap.set('banana', 'orange')
hashMap.set('carrot', 'brown')
hashMap.set('dog', 'gray')
hashMap.set('elephant', 'black')
hashMap.set('frog', 'purple')
hashMap.set('grape', 'white')
hashMap.set('hat', 'black')
hashMap.set('ice cream', 'blue')
hashMap.set('jacket', 'pink')
hashMap.set('kite', 'golden')
hashMap.set('lion', 'red')
// hashmap expands in size after adding moon
hashMap.set('moon', 'silver')



