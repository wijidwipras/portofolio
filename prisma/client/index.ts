const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// async function to create profile
// async function createProfile() {
//   try {
//     const profile = await prisma.profile.create({
//       data: {
//         id: 1,
//         name: "Raja",
//         summary: "I am an engineer",
//         no_wa: "08312345678",
//         email: "Xzqz6@example.com",
//         address: "Jakarta",
//         linkedin: "https://www.linkedin.com",
//         github: "https://www.github.com",
//         portofolio: "https://www.portofolio.com",
//       },
//     });
//     console.log("Profile created:", profile);
//   } catch (error) {
//     console.error("Error creating profile:", error);
//   }
// }

// // call the createProfile function
// createProfile();

export default prisma;
