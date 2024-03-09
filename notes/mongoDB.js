// code improve lecs
//.lec.4 cretae DB and dropDB
use demos //demos name ka DB
db.createollection("user")
db.user.drop() //delete collection
show dbs

//.lec.5 insert data in collection
db.users.insert({name:'test',lang:['node','js']})
db.users.insertMany([{name:'test',age:'30'},{name:'nest',age:'30'}])

//.lec.6 All queries
db.users.find().pretty()
db.users.find({name:'jav',age:'20'}) //yh dono hona chahiye ek object me  //@@
db.users.find([{name:'jav'},{age:'20'}]) //object m name ya age koi v match ho  //##
db.users.find({$or:[{name:'jav'},{age:'20'}]}) //yh dono hi hona chahiye  //@@
db.users.find({$nor:[{name:'jav'},{age:'20'}]}) // yh dono nhi hona chahiye //##
db.user.find({age:{$lt:'20'}}) //jiske age less than 20 ho 
db.user.find({age:{$lte:'20'}}) //jiski age 20 ho ya 20 se akm ho 
//similary $gt,$gte,$in(eg:jiski age 20 and 30 ho)
db.users.find({email:/dumy/})  //jiski email m dummy aata ho
//mix
db.users.find({$nor:[{name:'jav'},{age:'20'}],status:'active'})

//.lec.7 Projectile (response m agr particular key hi bhejni ho to second parameter me obj bhejo
db.users.find({},{name:1,email:1})

//.lec.8 update
db.users.update({email:'jav@gmail.com'},{$set:{age:32})

//.lec.9 delete
//.lec.10 limit(number) skip(number) short({name:1})
//age limit 5 ki h  to 1page me= 0skip, 2page me=5skip, 3page me=10skip, 

//.lec.11 $eleMatch
//senario--> 
// social:[{name:'aa',age:20},{name:'bb',age:30}]
db.users.find({socila:{$elemMatch:{name:'aa'}}})

//lec .12 distinct(), count()
//object m ek key h age mjhe inka array of string bnana h to
db.users.distinct('age') //-->yh hme array of string de dega
//conditionally
db.users.distinct('age',{status:'active'})
db.users.count({})

//lec.13 




