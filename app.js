const express = require("express");
var app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://" + process.env.IP + ":" + "27017/to-do-app");

var ToDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    time: String,
    done: Boolean 
});

var toDo = mongoose.model("ToDo", ToDoSchema);

var ToDoListSchema = new mongoose.Schema({
    date: String,
    todos: [ToDoSchema]
});

var ToDoList = mongoose.model("ToDoList", ToDoListSchema);






var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('static'));

app.set("view engine","ejs");

var path = require('path');

const start_date = '30-3-2018'


function TimeStampToDate(timestamp){
    
    var d = new Date(parseInt(timestamp, 10)*1000);
    console.log(parseInt(timestamp, 10))
    var date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
    
    return date;
}


function isDateLessThanStartDate(date, start_date){
    
    var date_arr = date.split('-')
    var start_date_arr = start_date.split('-')
    
    if(parseInt(date_arr[2], 10) <= parseInt(start_date_arr[2] ,10) && parseInt(date_arr[1], 10) <= parseInt(start_date_arr[1] ,10) && parseInt(date_arr[0], 10) <= parseInt(start_date_arr[0] ,10)  ){
        
        if(parseInt(date_arr[2], 10) == parseInt(start_date_arr[2] ,10) && parseInt(date_arr[1], 10) == parseInt(start_date_arr[1] ,10) && parseInt(date_arr[0], 10) == parseInt(start_date_arr[0] ,10)  ){
             
             return false
            
        } else{
            return true
            
        }        
        
    } else{
        return false
    }

}







app.get('/', function(req, res){
    res.render("index");
});

app.get('/:date', function(req, res) {
    var date = req.params.date;
    console.log(date)
    //var date = TimeStampToDate(timestamp);
    //console.log(date)
    if(isDateLessThanStartDate(date.toString(), start_date)){
        res.send("You can't really have a ToDo for a day, before a date, you became methodical, MoFo !!" );
    }
    else{
        ToDoList.findOne({date:date}, function(err,ToDo){
            if(err){
                console.log(err)
            }
            else{
                //console.log(ToDo.length);
                //var ToDoArray = ToDo.todos;
                //console.log(ToDoArray);
                console.log('...............');
                console.log(ToDo);
    
                
                
                res.render("todo_view",{ToDo:ToDo, date:date, start_date:start_date})
            }
            
        });
    
    }
    
    

});

app.post('/:date/post', function(req,res){
    
    var date = req.params.date;
    var todo = req.body;
    todo.done = false; 
    console.log(todo);
    
    ToDoList.findOne({date:date}, function(err,ToDo){
        if(err){
            console.log(err)
        }
        else{
            
            if(ToDo != null){
                var ToDoArray = ToDo.todos;
                //res.render("todo_view",{ToDoArray:ToDoArray})
                ToDoArray.push(todo);
                var query   = { date:date }; 
                var update  = {todos:ToDoArray}
                var options = { new: true }; 
                ToDoList.findOneAndUpdate(query, update, options, function(err, doc){ 
                  // Done! 
                  if(err){
                      console.log(err);
                      
                  }
                  else{
                      res.redirect("/"+date.toString())
                  }
                  
                  
                });
            
            }
            
            else{
                var todolist = {date:date, todos:[todo]};
                ToDoList.create(todolist, function(err,ToDo1){
                  if(err){
                      console.log(err);
                      
                  }
                  else{
                      console.log(ToDo1)
                      res.redirect("/"+date.toString());
                  }                
                    
                });
            }
        }
        
    });
    
});

app.get('/:date/edit/post/:post_id',function(req,res){
    var date = req.params.date;
    var post_id = req.params.post_id;

    console.log(date)
    //var date = TimeStampToDate(timestamp);
    //console.log(date)
    
    ToDoList.findOne({date:date}, function(err,ToDo){
        if(err){
            console.log(err)
        }
        else{
            //console.log(ToDo.length);
            //var ToDoArray = ToDo.todos;
            //console.log(ToDoArray);
            console.log('...............');
            console.log(ToDo);

            
            
            res.render("todo_edit",{ToDo:ToDo, date:date, post_id:post_id})
        }
        
    });    
    
});

app.put('/:date/edit/post/:post_id/:i',function(req,res){
    
    var date = req.params.date;
    var post_id = req.params.post_id;
    var i = req.params.i;
    var todo = req.body;

    console.log(date)
    //var date = TimeStampToDate(timestamp);
    //console.log(date)
    
    ToDoList.findOne({date:date}, function(err,ToDo){
        if(err){
            console.log(err)
        }
        else{
            
            if(ToDo != null){
                var ToDoArray = ToDo.todos;
                //res.render("todo_view",{ToDoArray:ToDoArray})
                ToDoArray[i] = todo;
                var query   = { date:date }; 
                var update  = {todos:ToDoArray}
                var options = { new: true }; 
                ToDoList.findOneAndUpdate(query, update, options, function(err, doc){ 
                  // Done! 
                  if(err){
                      console.log(err);
                      
                  }
                  else{
                      res.redirect("/"+date.toString())
                  }
                  
                  
                });
            
            }
            
            else{
                var todolist = {date:date, todos:[todo]};
                ToDoList.create(todolist, function(err,ToDo1){
                  if(err){
                      console.log(err);
                      
                  }
                  else{
                      console.log(ToDo1)
                      res.redirect("/"+date.toString());
                  }                
                    
                });
            }
        }
        
    });
        
});

app.delete('/:date/post/:post_id/:i',function(req,res){
    
    var date = req.params.date;
    var post_id = req.params.post_id;
    var i = req.params.i;
    //var todo = req.body;

    console.log(date)
    //var date = TimeStampToDate(timestamp);
    //console.log(date)
    
    ToDoList.findOne({date:date}, function(err,ToDo){
        if(err){
            console.log(err)
        }
        else{
            
            if(ToDo != null){
                var ToDoArray = ToDo.todos;
                //res.render("todo_view",{ToDoArray:ToDoArray})
                //ToDoArray[i] = todo;
                ToDoArray.splice(i,1)
                var query   = { date:date }; 
                var update  = {todos:ToDoArray}
                var options = { new: true }; 
                ToDoList.findOneAndUpdate(query, update, options, function(err, doc){ 
                  // Done! 
                  if(err){
                      console.log(err);
                      
                  }
                  else{
                      res.redirect("/"+date.toString())
                  }
                  
                  
                });
            
            }
            
 
        }
        
    });
        
});

app.post('/:date/todo/mark_done',jsonParser ,function(req,res){
    
    var date = req.params.date;
    var post_id = req.params.post_id;
    //var i = req.params.i;
    var i = req.body.i;
    console.log('value of i')
    console.log(i)
    //var date = TimeStampToDate(timestamp);
    //console.log(date)
    
    ToDoList.findOne({date:date}, function(err,ToDo){
        if(err){
            console.log(err)
        }
        else{
            
            if(ToDo != null){
                var ToDoArray = ToDo.todos;
                //res.render("todo_view",{ToDoArray:ToDoArray})
                i = parseInt(i,10);
                 console.log('todoarray')
                console.log(ToDoArray[i])
                var complete_status = ToDoArray[i].done ;
                ToDoArray[i].done = !complete_status;
                
                var query   = { date:date }; 
                var update  = {todos:ToDoArray}
                var options = { new: true }; 
                ToDoList.findOneAndUpdate(query, update, options, function(err, doc){ 
                  // Done! 
                  if(err){
                      console.log(err);
                      
                  }
                  else{
                      res.redirect("/"+date.toString())
                  }
                  
                  
                });
            
            }
            

        }
        
    });
        
});




app.listen(process.env.PORT, process.env.IP,function(){
    console.log('server running at '+ process.env.IP.toString()+':'+ process.env.PORT.toString())
});

