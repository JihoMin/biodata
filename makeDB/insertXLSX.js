// 모듈 선언
const mysql = require('mysql2/promise');
// const fs = require('fs');
// const Excel = require('exceljs');
const XlsxPopulate = require('xlsx-populate');

// DB 연결
const { MYSQL_URL, MYSQL_ID, MYSQL_PWD } = process.env;

var pool = mysql.createPool({
    host: MYSQL_URL,
    user: MYSQL_ID,
    password: MYSQL_PWD,
    database: "서울대병원",
    charset: "utf8",
});

var tableNames = []
var fieldsOfEachTable = []

const createTableNames = async (sheet1) => {
    tableNames = []
    for (i=0; i<sheet1.row(1)._cells.length; i++){
        var tableName = []
        if(sheet1.row(1).cell(i)._value){
            tableName.push(i)
            tableName.push(sheet1.row(1).cell(i)._value.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]|[()/]/g," ").trim().replace(/ /g,"_"))
            tableNames.push(tableName)
        }
    }
    tableNames[0].push(2)
    tableNames[1].push(2)
    tableNames[2].push(2)

    tableNames[3].push(3)
    tableNames[4].push(3)
    return tableNames
}

const createTables = async (query) => {
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

const writeSchema = async (sheet1, tN) => {
    var atts = []
    
    for(i = 1; i<=60; i++){
        atts.push(sheet1.row(2).cell(i)._value)
    }
    for(i = 61; i<sheet1.row(3)._cells.length; i++){
        atts.push(sheet1.row(3).cell(i)._value)
    }
    
    var schemas = []
    const base = 'create table if not exists';

    // 각 쿼리에 테이블 명을 붙임
    for(i=0; i<tN.length; i++){
        schemas.push(base+' '+tN[i][1]+'('+atts[0]+' VARCHAR(16) NOT NULL, '+atts[1]+' VARCHAR(16) NOT NULL, ')
    }
    // console.log(schemas) 

    // schemas for each table
    // 인적정보
    var fields = ["바코드", "날짜"]
    for(j=2; j<tN[1][0]-1; j++){
        var field = atts[j].replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]|[()/]/g," ").trim().replace(/ /g,"_")
        schemas[0] = schemas[0] +' '+field+' TEXT,'
        fields.push(field)
    }
    schemas[0] = schemas[0] + ' PRIMARY KEY(바코드, 날짜) )'
    fieldsOfEachTable.push(fields);
   
    // 문진, 기능검사, 혈액소변대변
    for(i=1; i<tN.length-1; i++){
        fields = ["바코드", "날짜"];
        for(j=tN[i][0]-1; j<tN[i+1][0]-1; j++){
            var field = atts[j].replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]|[()/]/g," ").trim().replace(/ /g,"_")
            schemas[i] = schemas[i] +' '+field+' TEXT,'
            fields.push(field)
        }
        schemas[i] = schemas[i] + ' PRIMARY KEY(바코드, 날짜) )'
        fieldsOfEachTable.push(fields);
    }

    // 영상검사
    fields = ["바코드", "날짜"];
    for(j=tN[4][0]-1; j<atts.length; j++){
        var field = atts[j].replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]|[()/]/g," ").trim().replace(/ /g,"_")
        schemas[4] = schemas[4] +' '+field+' TEXT,'
        fields.push(field)
    }
    schemas[4] = schemas[4] + ' PRIMARY KEY(바코드, 날짜) )'
    fieldsOfEachTable.push(fields);

    // console.log(fieldsOfEachTable)
    
    //console.log(schemas)
    // create query to create tables
    for(i=0; i<schemas.length; i++){
        createTables(schemas[i]);
    }
}

// Insert Query 날려주는 함수
// 
const insertData2 = async (table, fields, data) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            console.log(table)
            query = 'INSERT IGNORE INTO '+table.toString()+
                    '('+fields.toString()+')'+' VALUES ?';
            connection.query(query, [data]);
        } catch(err) {
            console.log(err);
        }
    } catch(err) {
        console.log(err);
    }
}

// read data row by row
// make them array of arrays
const makeInsertForm = async (usedSheet) => {
    var data = []
    var divided = []
    for(i=3; i<usedSheet.length; i++){
        if(!usedSheet[i][0]){
            data = usedSheet.slice(0,i);
            break;
        }
    }
    var fa = []
    var fa1 = []
    var fa2 = []
    var fa3 = []
    var fa4 = []
    for(i=3; i<data.length; i++){
        var f = [data[i][0].toString(),data[i][1].toString()]
        var f1 = [data[i][0].toString(),data[i][1].toString()]
        var f2 = [data[i][0].toString(),data[i][1].toString()]
        var f3 = [data[i][0].toString(),data[i][1].toString()]
        var f4 = [data[i][0].toString(),data[i][1].toString()]
        
        for(j=2; j<tableNames[1][0]-1; j++){
            if(data[i][j])
                f.push(data[i][j].toString())
            else
                f.push(null)
        }
        for(tableNames[1][0]-1; j<tableNames[2][0]-1; j++){
            if(data[i][j])
                f1.push(data[i][j].toString())
            else
                f1.push(null)
        }
        for(tableNames[2][0]-1; j<tableNames[3][0]-1; j++){
            if(data[i][j])
                f2.push(data[i][j].toString())
            else
                f2.push(null)
        }
        for(tableNames[3][0]-1; j<tableNames[4][0]-1; j++){
            if(data[i][j])
                f3.push(data[i][j].toString())
            else
                f3.push(null)
        }
        for(tableNames[4][0]-1; j<234; j++){
            if(data[i][j])
                f4.push(data[i][j].toString())
            else
                f4.push(null)
        }
        fa.push(f)
        fa1.push(f1)
        fa2.push(f2)
        fa3.push(f3)
        fa4.push(f4)

        divided.push(fa)
        divided.push(fa1)
        divided.push(fa2)
        divided.push(fa3)
        divided.push(fa4)
    }
   
    await insertData2(tableNames[0][1], fieldsOfEachTable[0], divided[0])
    await insertData2(tableNames[1][1], fieldsOfEachTable[1], divided[1])
    await insertData2(tableNames[2][1], fieldsOfEachTable[2], divided[2])
    await insertData2(tableNames[3][1], fieldsOfEachTable[3], divided[3])
    await insertData2(tableNames[4][1], fieldsOfEachTable[4], divided[4])
    
}

// create table Names (검사 항목에 따라 테이블명 생성)
// 2차원 배열, 각각 시작 col number, 테이블명, atribute명이 있는 row번호를 나타냄
try{
    XlsxPopulate.fromFileAsync('./data.xlsx', { password: "0406" })
        .then(workbook => {
            const sheet1 = workbook.sheet(0);
            const usedSheet = sheet1.usedRange().value()
            createTableNames(sheet1)
                .then( (tN) => {
                    writeSchema(sheet1, tN)
                        .then( () => {
                            makeInsertForm(usedSheet);
                        })
                })
            
        })
} catch(err) {
    console.log(err)
}