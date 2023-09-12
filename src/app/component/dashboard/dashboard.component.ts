import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue :string = '';

  constructor(private crudService : CrudService){

  }

  ngOnInit() : void{
    this.editTaskValue ='';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res =>{
      this.taskArr = res;
      },err =>{
        alert("Unable To Get List Of Tasks")
      });
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
      this.addTaskValue = "";
    },err =>{
      alert(err);
    })
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
    },res=>{
      alert("Failed To Update Task ");
    });
  }

  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed To Delete Task");
    } );
  }

  call(etask : Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

}
