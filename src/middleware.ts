import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    "/video(.*)", 
]);
export default clerkMiddleware(async (auth, request)=>{
    // Get the user ID from the request
    const { userId, redirectToSignIn } = await auth();

    // if the user is not signed in, redirect them to the sign in page
    if (!userId && isProtectedRoute(request)) {
      return redirectToSignIn();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
