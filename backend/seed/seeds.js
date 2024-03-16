import bcrypt from 'bcrypt';
import moment from 'moment';
import User from '../models/user.model.js'; // Assuming your User model is in a file named User.js
import Organization from '../models/Organization.model.js'; // Assuming your Organization model is in a file named Organization.js
const hashedPassword = await bcrypt.hash('123456', 10);
const userArray = [
    {
      fullName: "Admin",
      email: "dev+admin3@sciflare.com",
      password: hashedPassword,
      gender: "male",
      role: 'admin',
      createdAt: moment().toDate(),
      updatedAt: moment().toDate()
    },
    {
        fullName: "Admin",
        email: "dev+admin1@sciflare.com",
        password: hashedPassword,
        gender: "male",
        role: 'admin',
        createdAt: moment().toDate(),
        updatedAt: moment().toDate()
      },
      {
        fullName: "user",
        email: "dev+user@sciflare.com",
        password: hashedPassword,
        gender: "male",
        role: 'user',
        createdAt: moment().toDate(),
        updatedAt: moment().toDate()
      },
      {
        fullName: "user1",
        email: "dev+user2@sciflare.com",
        password: hashedPassword,
        gender: "male",
        role: 'user',
        createdAt: moment().toDate(),
        updatedAt: moment().toDate()
      }
    // Add other user records here...
  ]
 const orgArray =  [{
    orgName: 'amazon',
    branchName: 'vellore',
    description: 'YourOrganizationDescription'
  },
  {
    orgName: 'flipkart',
    branchName: 'chennai',
    description: 'YourOrganizationDescription'
  }]
var organizationId
async function seedUsers() {
  try {
   
    // Create organization if not exists
    orgArray.forEach(async(org) => {
        const organization = await Organization.findOne({ orgName: org.orgName });
        
        if (!organization) {
          const newOrganization = new Organization(org);
          await newOrganization.save();
          console.log('ord check',newOrganization,newOrganization._id);
          organizationId = newOrganization._id
    }
    })
    const organizationss = await Organization.findOne({ orgName: 'sciflare' });     
    if (!organizationss) {
       const sciflareOrg =  {
            orgName: 'sciflare',
            branchName: 'vellore',
            description: 'YourOrganizationDescription'
          }
        const sciflareUser = {
            fullName: "user1",
            email: "admin@sciflare.com",
            password: hashedPassword,
            gender: "male",
            role: 'admin'
          }  
      const newOrganization1 = await new Organization(sciflareOrg).save()
      sciflareUser.organization = newOrganization1._id
      const newUser = new User(sciflareUser);
        await newUser.save(); 

    }
   
userArray.forEach(async(user)=>{
    
    if(user.role != 'admin')
        user.organization = organizationId
      const userexist = await User.findOne({ email: user.email});
      if(!userexist){
        const newUser = new User(user);
        await newUser.save();  
      }
    
})
  

      console.log('Admin user seeded successfully.');
    

   

  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

export default seedUsers;
