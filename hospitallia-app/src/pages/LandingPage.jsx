import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 via-white to-teal-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
            Clinic Management Software for Modern Clinics &amp; Hospitals
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            EMR, Appointments, Billing, Payments, Telemedicine &amp; More —
            All-in-One, Cloud-based, and Paperless.
          </p>
          <a
            href="#request-demo"
            className="bg-blue-600 text-white px-8 py-3 rounded shadow font-semibold hover:bg-blue-700 transition"
          >
            Request Demo
          </a>
        </div>
      </section>

      {/* Trusted Clinics */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 text-gray-500 text-center">
          <span className="block font-semibold mb-2 text-gray-700">
            Trusted by 10,000+ Clinics &amp; Hospitals
          </span>
          {/* Replace below with your real client logos */}
          <div className="flex flex-wrap gap-6 justify-center items-center mt-4 text-sm opacity-70">
            <span>Manipal Hospitals</span>
            <span>Apollo Clinics</span>
            <span>Rainbow Hospitals</span>
            <span>Sparsh Hospital</span>
            <span>And Many More...</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-12">
            One Platform for All Your Clinic Operations
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🗓"
              title="Online Appointments"
              description="Easy scheduling, reschedule & reminders for staff and patients."
            />
            <FeatureCard
              icon="💳"
              title="Billing & Payments"
              description="Smart automated invoicing, payment links & digital receipts."
            />
            <FeatureCard
              icon="🩺"
              title="Electronic Medical Records"
              description="Paperless EMR with templates, attachments, and history timeline."
            />
            <FeatureCard
              icon="📱"
              title="Telemedicine"
              description="Secure video consults, digital Rx, and online follow-up flows."
            />
            <FeatureCard
              icon="📊"
              title="Analytics & Reporting"
              description="Real-time dashboards for productivity, billing, patients, more."
            />
            <FeatureCard
              icon="🔒"
              title="Compliance & Security"
              description="GDPR compliant, cloud-hosted, audit trail & role-based access."
            />
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <img
            src="https://docpulse.com/images/web-emr.png"
            alt="App dashboard preview"
            className="rounded-lg shadow-lg border max-w-md w-full"
          />
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Powerful Dashboard. Seamless Experience.
            </h3>
            <ul className="text-gray-700 text-lg mb-4 space-y-2">
              <li>• Intuitive interface for doctors, staff, and patients</li>
              <li>• Accessible anytime, anywhere — mobile & desktop</li>
              <li>• Effortless onboarding, migration & support</li>
            </ul>
            <a
              href="#request-demo"
              className="bg-blue-600 text-white px-6 py-3 rounded shadow font-semibold hover:bg-blue-700 transition"
            >
              Request Demo
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-900 text-center mb-10">
            Designed for Every Stakeholder
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon="👩‍⚕️"
              title="For Doctors"
              description="View appointments, write Rx, access records in seconds. Dictation, telemedicine, and alerts built-in."
            />
            <BenefitCard
              icon="🧑‍💼"
              title="For Clinic Admin/Staff"
              description="Handle queues, billing, inventory, compliance, and communication with ease — all on a single platform."
            />
            <BenefitCard
              icon="🧑‍🦱"
              title="For Patients"
              description="Self-book, reminders, download Rx/reports, connect securely from any device. No long waits, no confusion."
            />
          </div>
        </div>
      </section>

      {/* Demo Contact (CTA) */}
      <section id="request-demo" className="py-16 bg-blue-900 text-white">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to go Digital? Request a Demo.
          </h2>
          <p className="mb-6 text-lg">
            See why 10,000+ clinics switched to{" "}
            <span className="font-bold">ClinicPulse</span>: lower admin time,
            increased revenue, and better care.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded text-gray-800"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded text-gray-800"
              required
            />
            <input
              type="text"
              placeholder="Clinic/Hospital Name"
              className="w-full px-4 py-2 rounded text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded mt-2 shadow"
            >
              Request Demo
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

// --- Card Components ---
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold mb-2 text-blue-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-semibold text-blue-900 mb-1">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
