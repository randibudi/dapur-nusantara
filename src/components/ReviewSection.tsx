import { Star } from "lucide-react"
import { reviews } from "@/data/reviews"

const relativeDate = (dateStr: string): string => {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (diff === 0) return "Hari ini"
  if (diff === 1) return "Kemarin"
  if (diff < 30) return `${diff} hari yang lalu`
  if (diff < 365) return `${Math.floor(diff / 30)} bulan yang lalu`
  return `${Math.floor(diff / 365)} tahun yang lalu`
}

const ReviewSection = () => {
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl font-bold">{avgRating}</span>
        <div className="flex shrink-0 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 shrink-0 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-muted-foreground text-sm">{reviews.length} ulasan</span>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card rounded-lg border p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium">{review.name}</p>
                <p className="text-muted-foreground text-xs">
                  {review.packageName} · {relativeDate(review.date)}
                </p>
              </div>
              <div className="flex shrink-0 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 shrink-0 ${
                      i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReviewSection
