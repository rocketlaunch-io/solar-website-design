import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      
      <main className="pt-24 py-16 sm:py-24 px-4 md:px-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground">Last updated: January 1, 2024</p>
          
          <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Acceptance of Terms
              </h2>
              <p className="mt-4">
                By accessing and using Spark Website, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, 
                you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Use License
              </h2>
              <p className="mt-4">
                Permission is granted to access the materials on Spark Website for 
                personal and commercial use as outlined in your service agreement. This is the grant of a license, 
                not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Account Responsibilities
              </h2>
              <p className="mt-4">
                You are responsible for maintaining the confidentiality of your account and password 
                and for restricting access to your systems. You agree to accept responsibility for 
                all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Limitations
              </h2>
              <p className="mt-4">
                In no event shall Spark Website or its suppliers be liable for any damages arising 
                out of the use or inability to use the materials on the Spark Website platform.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Contact Us
              </h2>
              <p className="mt-4">
                If you have any questions about these Terms of Service, please contact us at 
                legal@sparkwebsite.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
