import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const committeeMembers = [
  { id: 1, name: "Md. Abdur Rahman", position: "President", photo: "https://i.pravatar.cc/150?u=1", profile: "Dedicated to community welfare and student development." },
  { id: 2, name: "Ali Hossain", position: "General Secretary", photo: "https://i.pravatar.cc/150?u=2", profile: "Organizing events and managing operations smoothly." },
  { id: 3, name: "Fatema Begum", position: "Vice President", photo: "https://i.pravatar.cc/150?u=3", profile: "Supporting social causes and cultural preservation." },
  { id: 4, name: "Omar Faruq", position: "Organizing Secretary", photo: "https://i.pravatar.cc/150?u=4", profile: "Focusing on community engagement." },
];

const advisors = [
  { id: 9, name: "Md. Shahab Uddin", designation: "Advisor", photo: "/advisors/images/shahabuddin.jpeg", bio: "Senior Teacher, Ali Amzad Goverment Girls High School." },
  { id: 5, name: "Kamal Uddin", designation: "Advisor", photo: "/advisors/images/kamal.jpeg", bio: "Senior Teacher, Tetaigoan Rashid Uddin High School."},
  { id: 2, name: "Dr. Tarana Jebin", designation: "Advisor", photo: "/advisors/images/tarana.jpeg", bio: "Dental Surgeon, 32 BCS" },
  { id: 8, name: "Dr. Nazrul Islam", designation: "Advisor", photo: "/advisors/images/nazrul.jpeg", bio: "Consultant(Medicine), MAG OSMANI MEDICAL COLLEGE HOSPITAL, SYLHET" },
  { id: 7, name: "Rasel Ahmed", designation: "Advisor", photo: "/advisors/images/rasel.jpeg", bio: "" },
  { id: 10, name: "Dr. Husne Ara Begum Sopna", designation: "Advisor", photo: "/advisors/images/sopna.jpeg", bio: "Register, 34 BCS"},
  { id: 4, name: "Jayed Hasan", designation: "Advisor", photo: "/advisors/images/zayed.jpeg", bio: "Assistant Superintendent of Police, 38 BCS" },
  { id: 1, name: "Tamizur Rahman", designation: "Advisor", photo: "/advisors/images/tamizur.jpeg", bio: "Assistant Teacher, Tetaigoan Rashid Uddin High School."},
  { id: 3, name: "Sohel Reza", designation: "Advisor", photo: "/advisors/images/sohel.jpeg", bio: "Assistant Teacher, Tetaigoan Rashid Uddin High School." },
  { id: 6, name: "Md. Sofiul Islam", designation: "Advisor", photo: "/advisors/images/sofiul.jpeg", bio: "Honors 4th year, Mathematics"},
  { id: 11, name: "Tajul Islam", designation: "Advisor", photo: "/advisors/images/tajul.jpg", bio: "Master 1st year, Shahjalal University of Science and Technology, Sylhet"},
];

const alumni = [
  { id: 1, name: "Dr. Hasan Mahmud", batch: "2015", photo: "https://i.pravatar.cc/150?u=7", current_role: "Surgeon at Central Hospital" },
  { id: 2, name: "Nasima Akter", batch: "2017", photo: "https://i.pravatar.cc/150?u=8", current_role: "Software Engineer at global tech firm" },
  { id: 3, name: "Tariqul Islam", batch: "2018", photo: "https://i.pravatar.cc/150?u=9", current_role: "Civil Service Officer" },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

async function seedDatabase() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore errors
          }
        },
      },
    }
  );

  try {
    console.log("Seeding Committee Members...");
    for (const member of committeeMembers) {
      const { error } = await supabase
        .from("committee")
        .upsert({ ...member, id: undefined }, { onConflict: "name" });
      if (error) console.error("Committee error:", error);
    }

    console.log("Seeding Advisors...");
    for (const advisor of advisors) {
      const { error } = await supabase
        .from("advisors")
        .upsert({ ...advisor, id: undefined }, { onConflict: "name" });
      if (error) console.error("Advisor error:", error);
    }

    console.log("Seeding Alumni...");
    for (const alumnus of alumni) {
      const { error } = await supabase
        .from("alumni")
        .upsert({ ...alumnus, id: undefined }, { onConflict: "name" });
      if (error) console.error("Alumni error:", error);
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

export async function GET() {
  await seedDatabase();
  return Response.json({ message: "Seeding completed" });
}
