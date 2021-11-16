'use strict'
const label=document.getElementById('inputlabel');
const text=document.querySelector('textarea');
const add=document.querySelector('#add');
const clear=document.querySelector('#clear');
const taskscontainer=document.querySelector('.taskscontainer');
var count=0;
const cl_title_task=function(){
    label.value='';
    text.value='';
}

const display_tasks=function(){
    if(!localStorage.length==0){
        taskscontainer.innerHTML='';
        let table=document.createElement('table');
        table.setAttribute('id','tb');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        taskscontainer.appendChild(table);
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Title";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Task";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        thead.appendChild(row_1);
        taskscontainer.classList.remove('aligncenter')
        for(const [key,value] of Object.entries(localStorage).sort()){
            let row=document.createElement('tr');
            row.setAttribute('id',key);

            let labeltask=document.createElement('td');
            labeltask.innerHTML=key+' -->';

            let value2=document.createElement('td');
            value2.style.color='green';
            value2.innerHTML=value

            let delicon=document.createElement('td');
            delicon.innerHTML=`<i id=${key} class="fas fa-trash"></i>`
            row.appendChild(labeltask);
            row.appendChild(value2);

            row.appendChild(delicon);
            tbody.appendChild(row);
            const deltask=document.querySelectorAll('i');
            deltask.forEach(ele=>ele.addEventListener('click',function(){
            localStorage.removeItem(ele.getAttribute('id'));
            display_tasks();
            }))
        }
    }
    else{
        taskscontainer.classList.add('aligncenter')
        taskscontainer.innerHTML='<p>Vola no Work to-do!</p>'
    }
}


const addtasks=function(){
    let tip= 'Tip: Set title and task both before you add them to your to-do list'
    let lst=[`If you do it again then see what happen\n\n${tip}`,`You brainless animal\n\n${tip}`,`It was not expected\n\n${tip}`,`Leave right now otherwise I will\n\n${tip}`];
    if((label.value==='' || text.value==='' || lst.includes(text.value))){
        text.value=lst[count];
        count+=1;
    }
    else{
        localStorage.setItem(label.value,text.value);
        cl_title_task();
        display_tasks();
    }
    if(count===5){
        window.close();
    }
}

add.addEventListener('click',function(){
    addtasks();
})

clear.addEventListener('click',function(){
    cl_title_task();
})

document.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
        addtasks();
    }
});

// localStorage.clear();
display_tasks();


