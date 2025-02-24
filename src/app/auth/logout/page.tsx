import { auth, signOut } from "@/auth";

export default async function Logout() {
  const session = await auth();

  if (!session) {
    return (
      <div>
        <p>You are not signed in.</p>
        <a href="/auth/login">Sign in</a>
      </div>
    );
  }
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
