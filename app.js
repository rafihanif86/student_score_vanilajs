
//Selectors
var dataStudent = [];
var studentArr = [];
var nrpArr = [];
var nrpList = [];
var studentDataObj = [];


defaultData();
console.log('data ', studentArr);
dataShow();

//Event Listeners
document.getElementById('submit-button').onclick = function(){
    addData();
}

//Function

function defaultData(){
    dataStudent = [
        ["123", "Hula", "Math", "UTS", 8],
        ["123", "Hula", "Math", "UAS", 7],
        ["123", "Hula", "History", "UTS", 6],
        ["123", "Hula", "History", "UAS", 5],
        ["123", "Hula", "History", "Project", 4],
        ["456", "Bobo", "Math", "UTS", 10],
        ["456", "Bobo", "Math", "UAS", null],
        ["456", "Bobo", "History", "UTS", 6],
        ["456", "Bobo", "History", "UAS", 5],
        ["456", "Bobo", "History", "Project", null],
        ["789", "Luna", "Math", "UTS", 10],
        ["789", "Luna", "Math", "UAS", null],
        ["789", "Luna", "History", "UTS", 6],
        ["789", "Luna", "History", "UAS", 5],
        ["789", "Luna", "History", "Project", null]
    ];
    console.log('student',dataStudent);
}

function dataShow(){

    //mencari list nrp
    for (let i in dataStudent){
        const sameData = nrpList.includes(dataStudent[i][0]);
        if(!sameData){
            nrpList.push(dataStudent[i][0]);
        }
    }

    var studentDatas = [];
    for (let a in nrpList) {
        studentDatas = [];
        var subject = [];
        var name = '';
        var allScore = [];

        for (let i in dataStudent){
            if(dataStudent[i][0] === nrpList[a]){
                studentDatas.push(dataStudent[i]);
                allScore.push(dataStudent[i][4]);
                name = dataStudent[i][1];
                const sameData = subject.includes(dataStudent[i][2]);
                if(!sameData){
                    subject.push(dataStudent[i][2]);
                }
            }
        }

        var scoreData = [];
        var finalscore = [];
        for (let i in subject){
            let score = 0;
            let count = 0;
            scoreData.push([subject[i]]);
            for(let b in studentDatas){
                if(studentDatas[b][2] == subject[i]){
                    score += studentDatas[b][4];
                    count++;
                    scoreData[i].push([studentDatas[b][3],studentDatas[b][4]])
                }
            }
            finalscore.push(score/count);
        }
        studentDataObj.push([nrpList[a],name,scoreData]);

        console.log('scoreData', scoreData);

        console.log('subject', subject);
        console.log('final score', finalscore);

        var datas = document.getElementById('datas');

        const containerDiv = document.createElement("div");
        containerDiv.classList.add("container");
        //row 1
        const row1 = document.createElement("div");
        row1.classList.add("row");
        containerDiv.appendChild(row1);
        //col 1
        const divCol = document.createElement("div");
        divCol.classList.add('col-50');
        divCol.innerHTML = '<p>'+nrpList[a]+'</p><h1>'+ name +'</h1>';
        row1.appendChild(divCol);
        //col 1
        const divCol1 = document.createElement("div");
        divCol1.classList.add('col-50');
        row1.appendChild(divCol1);
        //row 1
        const row2 = document.createElement("div");
        row2.classList.add("row");
        divCol1.appendChild(row2);
        //col 2
        const divCol2 = document.createElement("div");
        divCol2.classList.add('col-70');
        divCol2.innerHTML += '<h3>Final Score</h3>'
        for(let i in subject){
            divCol2.innerHTML += '<p>'+subject[i]+' \t : '+ finalscore[i].toString().substring(0,4) +'</p>';
        }
        row2.appendChild(divCol2);
        //col 3
        const divCol3 = document.createElement("div");
        divCol3.classList.add('col-30');
        divCol3.innerHTML += '<h3>Median</h3><div class="numberIcon">'+ median(allScore) +'</div>';
        row2.appendChild(divCol3);
        // const hr = document.createElement("hr");
        // containerDiv.appendChild(hr);
        //row 2
        const row3 = document.createElement("div");
        row3.classList.add("row");
        containerDiv.appendChild(row3);
        //col 1
        const divCol4 = document.createElement("div");
        divCol4.classList.add('col-100');
        row3.appendChild(divCol4);
        //
        for(let i in scoreData){
            //row 3
            const row4 = document.createElement("div");
            row4.classList.add("row");
            divCol4.appendChild(row4);
            //col 1
            const divCol5 = document.createElement("div");
            divCol5.classList.add('col-30');
            divCol5.innerHTML='<h3>'+scoreData[i][0]+'</h3>'
            row4.appendChild(divCol5);

            const divCol6 = document.createElement("div");
            divCol6.classList.add('col-70');
            for(let b = 1; b <= scoreData[i].length-1; b++){
                divCol6.innerHTML+='<p>'+scoreData[i][b][0]+' : ' + scoreData[i][b][1] +'</p>'
            }
            row4.appendChild(divCol6);

        }
        datas.appendChild(containerDiv);    
        console.log('student data', studentDatas);

    }
}

function addData(event){
    var inNrp = document.getElementById('nrp').value;
    var inStudent = document.getElementById('name').value;
    var inSubject = document.getElementById('subject').value;
    var inTest = document.getElementById('test').value;
    var inTestScore = document.getElementById('test-score').value;

    dataStudent.push([inNrp,inStudent,inSubject, inTest, inTestScore]);
}

console.log('student data obj', studentDataObj);

function median(values){
    if(values.length ===0) throw new Error("No inputs");
  
    values.sort(function(a,b){
      return a-b;
    });
  
    var half = Math.floor(values.length / 2);
    
    if (values.length % 2)
      return values[half];
    
    return (values[half - 1] + values[half]) / 2.0;
  }
