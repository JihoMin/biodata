const mysql = require('mysql2/promise');
const fs = require('fs');
const csv = require('fast-csv');

var pool = mysql.createPool({
    host: MYSQL_URL,
    user: MYSQL_ID,
    password: MYSQL_PWD,
    database: "test"
});

//csv 받는 모듈
//csv에서 데이터 추출
//추출된 데이터로 insert query
const createSchema = async (query) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            connection.query(query);
        } catch(err) {
            console.log(err);
        }
    } catch(err) {
        console.log(err);
    }
}
const insertData2 = async (fields, data) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            console.log(fields.toString())
            query = 'INSERT INTO test('+fields.toString()+')'+' VALUES ?';
            connection.query(query, [data]);
        } catch(err) {
            console.log(err);
        }
    } catch(err) {
        console.log(err);
    }
}
/*
const insertData = async (fields, data) => {
    console.log("he")
    var setValues = {
        NIHID: data[0],
        SEX: parseInt(data[1]),
        AGE: parseInt(data[2]),
        FHTN: parseInt(data[3]),
        FDM: parseInt(data[4]),
        FMI: parseInt(data[5]),
        FCVA: parseInt(data[6]),
        FCA: parseInt(data[7]),
        MARRY: parseInt(data[8]),
        JOB: parseInt(data[9]),
        SMOKE: parseInt(data[10]),
        PSM: parseInt(data[11]),
        DRINK: parseInt(data[12]),
        SOJUFQ: parseInt(data[13]),
        TAKFQ: parseInt(data[14]),
        RICEFQ: parseInt(data[15]),
        WINEFQ: parseInt(data[16]),
        HLIQFQ: parseInt(data[17]),
        ETCFQ: parseInt(data[18]),
        BEERFQ: parseInt(data[19]),
        EXER: parseInt(data[20]),
        EXERFQ: parseInt(data[21]),
        HEIGHT: parseFloat(data[22]),
        WEIGHT: parseFloat(data[23]),
        BMI: parseFloat(data[24]),
        WAIST: parseFloat(data[25]),
        HIP: parseFloat(data[26]),
        PULSE: parseFloat(data[27]),
        GLU16_U: parseInt(data[28]),
        PRT16_U: parseInt(data[29]),
        PH_U: parseInt(data[30]),
        BLOOD16_U: parseInt(data[31]),
        HB: parseFloat(data[32]),
        GLUO: parseInt(data[33]),
        R_GTP: parseFloat(data[34]),
        AST: parseFloat(data[35]),
        ALT: parseInt(data[36]),
        BUN: parseInt(data[37]),
        CREATININE: parseFloat(data[38]),
        URICACID: parseInt(data[39]),
        TCHL: parseInt(data[40]),
        HDL: parseInt(data[41]),
        TG: parseInt(data[42]),
        HSCRP: parseFloat(data[43]),
        SS01: parseFloat(data[44]),
        SS02: parseFloat(data[45]),
        SS03: parseFloat(data[46]),
        SS04: parseFloat(data[47]),
        SS05: parseFloat(data[48]),
        SS06: parseFloat(data[49]),
        SS07: parseFloat(data[50]),
        SS08: parseFloat(data[51]),
        SS09: parseFloat(data[52]),
        SS10: parseFloat(data[53]),
        SS11: parseFloat(data[54]),
        SS12: parseFloat(data[55]),
        SS13: parseFloat(data[56]),
        SS14: parseFloat(data[57]),
        SS15: parseFloat(data[58]),
        SS16: parseFloat(data[59]),
        SS17: parseFloat(data[60]),
        SS18: parseFloat(data[61]),
        SS19: parseFloat(data[62]),
        SS20: parseFloat(data[63]),
        SS21: parseFloat(data[64]),
        SS23: parseFloat(data[65]),
        SS24: parseFloat(data[66]),
        result: parseInt(data[67]),
        idx: parseInt(data[68]),
    }
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            console.log(setValues);
            query = 'INSERT INTO test SET ?'
            connection.query(query, setValues);
        } catch(err) {
            console.log(err);
        }
    } catch(err) {
        console.log(err);
    }
}
*/
var stream = fs.createReadStream("./HIGHBP.csv");
var alldata = []
var allInsert = []
var csvStream = csv()
    .on("data", function(data){
        //console.log(data);
        alldata.push(data);
        //console.log(alldata);
    })
    .on("end", function () {
        console.log(alldata.length);
        //console.log(alldata[1]);
        //console.log(alldata[2]);
        var createQuery = 
        'create table if not exists test( '+
        alldata[2][0]+' '+alldata[1][0]+' primary key,';

        for(var i = 1; i<alldata[0].length; i++){
            createQuery = createQuery + ' '+ alldata[2][i]+' '+ alldata[1][i] + ' not null,';
        }
        createQuery = createQuery.substr(0, createQuery.length-1)+" )";
        createSchema(createQuery);
        
        for(var i = 4000; i<4500; i++){
            var setValues = [
                alldata[i][0],
                parseInt(alldata[i][1]),
                parseInt(alldata[i][2]),
                parseInt(alldata[i][3]),
                parseInt(alldata[i][4]),
                parseInt(alldata[i][5]),
                parseInt(alldata[i][6]),
                parseInt(alldata[i][7]),
                parseInt(alldata[i][8]),
                parseInt(alldata[i][9]),
                parseInt(alldata[i][10]),
                parseInt(alldata[i][11]),
                parseInt(alldata[i][12]),
                parseInt(alldata[i][13]),
                parseInt(alldata[i][14]),
                parseInt(alldata[i][15]),
                parseInt(alldata[i][16]),
                parseInt(alldata[i][17]),
                parseInt(alldata[i][18]),
                parseInt(alldata[i][19]),
                parseInt(alldata[i][20]),
                parseInt(alldata[i][21]),
                parseFloat(alldata[i][22]),
                parseFloat(alldata[i][23]),
                parseFloat(alldata[i][24]),
                parseFloat(alldata[i][25]),
                parseFloat(alldata[i][26]),
                parseFloat(alldata[i][27]),
                parseInt(alldata[i][28]),
                parseInt(alldata[i][29]),
                parseInt(alldata[i][30]),
                parseInt(alldata[i][31]),
                parseFloat(alldata[i][32]),
                parseInt(alldata[i][33]),
                parseFloat(alldata[i][34]),
                parseFloat(alldata[i][35]),
                parseInt(alldata[i][36]),
                parseInt(alldata[i][37]),
                parseFloat(alldata[i][38]),
                parseInt(alldata[i][39]),
                parseInt(alldata[i][40]),
                parseInt(alldata[i][41]),
                parseInt(alldata[i][42]),
                parseFloat(alldata[i][43]),
                parseFloat(alldata[i][44]),
                parseFloat(alldata[i][45]),
                parseFloat(alldata[i][46]),
                parseFloat(alldata[i][47]),
                parseFloat(alldata[i][48]),
                parseFloat(alldata[i][49]),
                parseFloat(alldata[i][50]),
                parseFloat(alldata[i][51]),
                parseFloat(alldata[i][52]),
                parseFloat(alldata[i][53]),
                parseFloat(alldata[i][54]),
                parseFloat(alldata[i][55]),
                parseFloat(alldata[i][56]),
                parseFloat(alldata[i][57]),
                parseFloat(alldata[i][58]),
                parseFloat(alldata[i][59]),
                parseFloat(alldata[i][60]),
                parseFloat(alldata[i][61]),
                parseFloat(alldata[i][62]),
                parseFloat(alldata[i][63]),
                parseFloat(alldata[i][64]),
                parseFloat(alldata[i][65]),
                parseFloat(alldata[i][66]),
                parseInt(alldata[i][67]),
                parseInt(alldata[i][68]),
            ]
            allInsert.push(setValues);
            //console.log(setValues);
        }
        //console.log(allInsert);
        insertData2(alldata[2], allInsert);
        console.log("done");
    })
stream.pipe(csvStream);
//console.log(alldata);
