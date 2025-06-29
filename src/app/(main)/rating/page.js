import RatingForm from "@/components/Rating"

export default function RatePage() {
    return (
        <>
        <section className="py-20 px-8 grid justify-items-center">
            <RatingForm/>
        </section>
        {/* Divider */}
      <div className="border-t border-border my-20"></div>

      {/* Footer CTA */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-primary">Kami Menantikan Feedback Anda!</h2>
        <p className="text-muted-foreground">
          Setiap ulasan dan saran akan membantu kami menjadi lebih baik.
        </p>
      </div>
      </>
    )
}