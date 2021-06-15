const express = require('express');
const bodyParser= require('body-parser');
const fileUpload = require('express-fileupload');


const app = express();
const cors = require("cors");

/*pour verifier si un utilisateur existe ou pas,
et s il exist on recupper ses informations*/
const GetUser = require('./controllers/user/getUser');


const IsRegistred = require('./controllers/user/isRegistred');


const GetAcceptedDoct = require("./controllers/user/getAcceptedDoct")

/*
 Pour importer les informations de l'excel
*/
const Import = require('./controllers/user/uploadExcel');

/*
    Pour recupperer les doctorants preselection
*/
const DoctPreselected = require("./controllers/user/doctPreselect");


/*
    Pour recupperer les anciens doctorants
*/
const OldDoct = require("./controllers/user/oldDoct");

/*
    Pour avoir liste des enseignants
*/
const GetEnsg = require("./controllers/user/getEnsg");

/*
    Pour avoir liste des structure de recherche
*/
const GetStructure = require("./controllers/structure/getStructure");

/*
    Pour modifier une structure de recherche
*/
const UpdateStructureById = require("./controllers/structure/updateStructureById");


/*

*/
const GetNewMemberToAdd = require("./controllers/structure/GetNewMemberToAdd");


/*

*/
const RetireMembre = require("./controllers/structure/RetireMembre")

/*

*/
const AddMember = require("./controllers/structure/AddMember")


/*
    Pour avoir liste des grade
*/
const GetGrade = require("./controllers/structure/getGrade");

/*
    Pour ajouter un nouveau enseigant
*/
const AddEnsg = require("./controllers/user/addEnsg");

/*
    Pour supprimer un enseigannt
*/
const DeleteEnsg = require("./controllers/user/deleteEnsg");

/*
    Get un enseignant bien specifie (par id) 
*/
const GetEnsgById = require("./controllers/user/getEnsgById");

/*
    modifier les informations d'un enseignant par responsable de cedoc
*/
const UpdateEnsg = require("./controllers/user/updateEnsg");


/*
    Ajouter une nouvelle structure
*/
const AddStructure = require("./controllers/structure/addStructure");

/*
    Pour get la liste des enseignant qui peuvont etre des chef d'une nouvelle structure
*/
const GetNewChef = require("./controllers/user/getNewChef");

/*
    Pour get liste des structure de meme type (equipe - labo - center ...)
*/
const GetStructureByType = require("./controllers/structure/getStructureByType");

/*
    Pour supprimer une structure
*/
const DeleteStruct = require("./controllers/structure/deleteStruct");

/*
    get les statistique du dashboard
*/
const getDashInfos = require("./controllers/dashInfos");

/*
    recupperer les membre d'une struture
*/
const GetMembers = require("./controllers/structure/getMember");

/*
    recupperer les informations d'un doctorant
*/
const getDoctInfos = require("./controllers/user/getDoctInfos");

/*
    uploader les fichiers d'inscription
*/
const uploadFileInscription = require("./controllers/document/uploadFileInscription")

/*
 supprimer un fichier par le doctorant
*/
const DeleteFile = require("./controllers/document/deleteFile")

/*
    Pour get les documents d'un doctorant
    ***** pas encore terminer******
*/
const getDoctFiles = require("./controllers/user/getDoctFiles");

/*
    
*/
const getEnsgAccountInfos = require("./controllers/user/getEnsgAccountInfos");

/*
    Pour accepter ou refuser un doctorant lors de l'etape de la selection par le chef d 'equipe
*/
const selectPretDoct = require("./controllers/user/selectPretDoct");

/*
    pour recupperer les ensg de meme structure
*/
const getEnsgSameStruct = require("./controllers/user/getEnsgSameStruct");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

//const port = process.env.PORT;
const port = 3001;

app.get("/",(req,res)=>{
    res.send("welcome to cedoc")
})
app.post("/auth/login",(request,response)=>{
    GetUser(response,request);
})

app.post("/auth/isRegistred",(request,response)=>{
    IsRegistred(response,request);
})

app.post("/auth/importExcel",(request,response)=>{
    Import(response,request)
})

app.get("/auth/doctPreselected",(request,response)=>{
    DoctPreselected(response,request)
})
app.post("/auth/selectPretDoct",(request,response)=>{
    selectPretDoct(response,request)
})

app.get("/auth/OldDoct",(request,response)=>{
    OldDoct(response,request)
})
app.get("/auth/Ensg",(request,response)=>{
    GetEnsg(response,request)
})
app.post("/auth/GetEnsg",(request,response)=>{
    GetEnsgById(response,request)
})

app.post("/auth/getEnsgSameStruct",(request,response)=>{
    getEnsgSameStruct(response,request)
})

app.post("/auth/GetMembers",(request,response)=>{
    GetMembers(response,request)
})
app.post("/auth/RetireMembre",(request,response)=>{
    RetireMembre(response,request)
})
app.post("/auth/DeleteEnsg",(request,response)=>{
    DeleteEnsg(response,request)
})

app.post("/auth/getDoctInfos",(request,response)=>{
    getDoctInfos(response,request)
})
app.post("/auth/getDoctFiles",(request,response)=>{
    getDoctFiles(response,request)
})
app.post("/auth/DeleteFile",(request,response)=>{
    DeleteFile(response,request)
})
app.get("/auth/getAcceptedDoct",(request,response)=>{
    GetAcceptedDoct(response,request)
})


app.post("/auth/UpdateEnsg",(request,response)=>{
    UpdateEnsg(response,request)
})
app.post("/auth/uploadFileInscription",(request,response)=>{
    uploadFileInscription(response,request)
})
app.post("/auth/getDoctDocuments",(request,response)=>{
    GetDoctDocuments(response,request)
})



app.get("/auth/getGrade",(request,response)=>{
    GetGrade(response,request)
})
app.get("/auth/GetNewChef",(request,response)=>{
    GetNewChef(response,request)
})
app.post("/auth/addEnsg",(request,response)=>{
    AddEnsg(response,request)
})




app.post("/auth/getDashInfos",(request,response)=>{
    getDashInfos(response,request)
})
app.post("/auth/getEnsgAccountInfos",(request,response)=>{
    getEnsgAccountInfos(response,request)
})



app.get("/auth/listStruct",(request,response)=>{
    GetStructure(response,request)
})
app.post("/auth/GetStructureByType",(request,response)=>{
    GetStructureByType(response,request)
})
app.post("/auth/UpdateStructureById",(request,response)=>{
    UpdateStructureById(response,request)
})
app.post("/auth/AddStructure",(request,response)=>{
    AddStructure(response,request)
})
app.post("/auth/GetNewMemberToAdd",(request,response)=>{
    GetNewMemberToAdd(response,request)
})
app.post("/auth/AddMember",(request,response)=>{
    AddMember(response,request)
})
app.post("/auth/DeleteStruct",(request,response)=>{
    DeleteStruct(response,request)
})


app.listen(port, ()=>{
    console.log('app running on port '+port);
})