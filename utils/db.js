import bcrypt from "bcrypt"
import clientPromise from "@/lib/db"

export async function getUserFromDb(email, password) {
  try {
    const client = await clientPromise
    const db = client.db()

    const user = await db.collection("users").findOne({ email })

    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user

    return {
      id: user._id.toString(),
      ...userWithoutPassword,
    }
  } catch (error) {
    console.error("Error getting user from db:", error)
    return null
  }
}
