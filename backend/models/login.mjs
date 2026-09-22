import mongoose,{Schema} from "mongoose";
const ALL_VALID_ROLES = [
  "superAdmin", "admin", "supplier", "manager", "cashier", 
  "sales-man", "helper", "accounts", "engineer", "backoffice", 
  "security", "cleaner", "worker", "customer"
];
const loginAuth=Schema({
    email:{type:String,required:true,unique:true,include:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    password:{type:[String],required:true},
    profileType: { 
      type: String, 
      required: true, 
      enum: ['Admin', 'Employee', 'Customer', 'Supplier'] // Must match your exact mongoose.model names!
    },
    role:{type:String,enum:ALL_VALID_ROLES,lowercase:true,default:"user"},
    userref:{type:mongoose.Schema.Types.ObjectId,ref:'profileType'}
})

const loginModel= mongoose.model("login",loginAuth);

export default loginModel;