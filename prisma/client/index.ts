const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

// createProfile();

// async function main() {
//   try {
//     const event = await prisma.experience.create({
//       //   data: {
//       //     name: "Company Meeting",
//       //     desc: "Quarterly financial review meeting",
//       //     start: new Date("2024-07-01T09:00:00.000Z"),
//       //     end: new Date("2024-07-01T11:00:00.000Z"),
//       //   },
//       data: {
//         name: "Teacher",
//         desc: "Quarterly financial review meeting",
//         start: new Date("2024-07-01T09:00:00.000Z"),
//         end: new Date("2024-07-01T11:00:00.000Z"),
//       },
//     });
//     console.log("Event created:", event);
//   } catch (error) {
//     console.error("Error creating event:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();

export default prisma;
