import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      
      <main className="pt-24 py-16 sm:py-24 px-4 md:px-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground">Last updated: January 1, 2024</p>
          
          <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Information We Collect
              </h2>
              <p className="mt-4">
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support. This may include your name, email address, 
                phone number, billing address, and payment information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                How We Use Your Information
              </h2>
              <p className="mt-4">
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, send you technical notices and support messages, and respond 
                to your comments and questions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Data Security
              </h2>
              <p className="mt-4">
                We take reasonable measures to help protect your personal information from loss, 
                theft, misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Contact Us
              </h2>
              <p className="mt-4">
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@sparkwebsite.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
