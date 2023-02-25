/* Week 10 Coding Assignment
[x] Using HTML, Bootstrap, and JavaScript create a single page website that contains the following:
[x] A Bootstrap styled table representing your choice of data.
[x] A Bootstrap styled form that allows a user to add a new row to the table when clicking on submit.
 */

class Student {
    constructor(name, grade){
        this.name=name;
        this.grade=grade;
    }
}

class Session {
    constructor(id, name) {
        this.id=id;
        this.name=name;
        this.students=[];
    }

    addStudent(student){
        let index=this.students.indexOf(student);
        this.students.push(student);
    }

    deleteStudent(student){
        let index=this.students.indexOf(student);
        this.students.splice(index, 1);
    } 
}

let sessions=[];
let sessionId=0;

onClick('new-session', () =>{
    sessions.push(new Session(sessionId++, getValue('new-session-name')));
    drawDOM();
});

function onClick(id, action){
    let element=document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id){
return document.getElementById(id).value;
}

function drawDOM(){
    let sessionDiv=document.getElementById('sessions');
    clearElement(sessionDiv);
    for (session of sessions) {
        let table=createSessionTable(session);
        let title=document.createElement('h2');
        title.innerHTML=session.name;
        title.appendChild(createDeleteSessionButton(session));
        sessionDiv.appendChild(title);
        sessionDiv.appendChild(table);
        for (student of session.students){
            createStudentRow(session, table, student);
        }
        console.log(session.students); //check array as data is entered.  not needed for website to run.
    }
}

function createStudentRow(session, table, student){
    let row=table.insertRow(2);
    row.insertCell(0).innerHTML=student.name;
    row.insertCell(1).innerHTML=student.grade;
    let actions=row.insertCell(2);
    actions.appendChild(createDeleteRowButton(session, student));
    let insrt=row.insertCell(2);  //adding count feature in future project
    insrt.appendChild(createCountBadge()); //adding count feature in future project
  }

function createDeleteRowButton(session, student){
    let btn=document.createElement('button');
    btn.className='btn btn-secondary';
    btn.innerHTML='Delete';
    btn.onclick = ()=> {
        let index=session.students.indexOf(student);
        session.students.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createCountBadge(session, student){  //adding count feature in future project
    let badge=document.createElement('badge');
    badge.className='badge badge-pill badge-dark';
    badge.innerHTML='# of 10'; //add length reference
    return badge
   }

function createDeleteSessionButton(session){
    let btn=document.createElement('button');
    btn.className='btn btn-secondary';
    btn.innerHTML='Delete Session';
    btn.onclick=()=> {
      let index=sessions.indexOf(session);
      sessions.splice(index, 1);
      drawDOM();  
    };
    return btn;
}

function createNewStudentButton(session) {
   let btn=document.createElement('button');
   btn.className='btn btn-secondary';
   btn.innerHTML='Create';
   btn.onclick= () => {
    session.students.push(new Student(getValue(`name-input-${session.id}`), getValue(`grade-input-${session.id}`))); 
    drawDOM();
    };
    return btn;
  } 

function createSessionTable(session) {
  let table=document.createElement('table');
  table.setAttribute('class', 'table table-success table-striped');
  let row = table.insertRow(0);
  let nameColumn=document.createElement('th');
  let gradeColumn=document.createElement('th');
  let countColumn=document.createElement('th'); //adding count feature in future project
  let buttonColumn=document.createElement('th');
  nameColumn.innerHTML='Student Name';
  gradeColumn.innerHTML='Grade'; 
  countColumn.innerHTML='Count'; //adding count feature in future project
  buttonColumn .innerHTML=""; //added to even out form color distribution
  row.appendChild(nameColumn);
  row.appendChild(gradeColumn);
  row.appendChild(countColumn); //adding count feature in future project
  row.appendChild(buttonColumn); //added to even out form color distribution
  let formRow=table.insertRow(1);
  let nameTh=document.createElement('th');
  let gradeTh=document.createElement('th');
  let countTh=document.createElement('th'); //adding count feature in future project
  let createTh=document.createElement('th');
  let nameInput=document.createElement('input');
  nameInput.setAttribute('id', `name-input-${session.id}`);
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('class', 'form-control');
  let gradeInput=document.createElement('input');
  gradeInput.setAttribute('id', `grade-input-${session.id}`);
  gradeInput.setAttribute('type', 'text');
  gradeInput.setAttribute('class', 'form-control');

  let countInput=document.createElement('badge'); //adding count feature in future project
  countInput.setAttribute('id', `count-input-${session.id}`);
  countInput.setAttribute('type', 'text');
  countInput.setAttribute('class', 'badge');

  let newStudentButton=createNewStudentButton(session);
  nameTh.appendChild(nameInput);
  gradeTh.appendChild(gradeInput);
  countTh.appendChild(countInput); //adding count feature in future project
  createTh.appendChild(newStudentButton);
  formRow.appendChild(nameTh);
  formRow.appendChild(gradeTh);
  formRow.appendChild(countTh); //adding count feature in future project
  formRow.appendChild(createTh);
  return table;
}

function clearElement(element){
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
