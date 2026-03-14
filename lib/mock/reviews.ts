export interface Review {
  id: string;
  materialId: string;
  orderId: string;
  buyerName: string;
  buyerType: string;
  materialQuality: number;
  gradeAccuracy: number;
  deliveryPunctuality: number;
  comment: string;
  createdAt: string;
}

export const reviews: Review[] = [
  {
    id: "rev-001",
    materialId: "mat-001",
    orderId: "ORD-20260301-001",
    buyerName: "S. Arumugam",
    buyerType: "Road Contractor",
    materialQuality: 5,
    gradeAccuracy: 5,
    deliveryPunctuality: 4,
    comment:
      "Excellent quality concrete aggregate. The 20mm grading was very consistent — exactly what we needed for road sub-base. Delivery was a little late but driver was communicative.",
    createdAt: "2026-03-05T10:00:00Z",
  },
  {
    id: "rev-002",
    materialId: "mat-001",
    orderId: "ORD-20260228-002",
    buyerName: "CCMC Procurement",
    buyerType: "Municipal Authority",
    materialQuality: 5,
    gradeAccuracy: 5,
    deliveryPunctuality: 5,
    comment:
      "Consistently reliable supply. WTN documentation was perfect and the lab certificate helped us satisfy our engineer's approval quickly. Reordering soon.",
    createdAt: "2026-03-02T14:00:00Z",
  },
  {
    id: "rev-003",
    materialId: "mat-003",
    orderId: "ORD-20260220-003",
    buyerName: "Sri Mahalakshmi Steels",
    buyerType: "Recycling Plant",
    materialQuality: 4,
    gradeAccuracy: 4,
    deliveryPunctuality: 5,
    comment:
      "Good quality rebar. A few pieces had minor corrosion but overall within acceptable range for our shredder input. Grade accuracy is better than informal market alternatives.",
    createdAt: "2026-02-22T09:00:00Z",
  },
  {
    id: "rev-004",
    materialId: "mat-007",
    orderId: "ORD-20260215-004",
    buyerName: "Chennai Poly Products",
    buyerType: "Recycling Plant",
    materialQuality: 5,
    gradeAccuracy: 5,
    deliveryPunctuality: 5,
    comment:
      "Best HDPE we've sourced from any platform. The AI sorting really shows — contamination levels were under 2%, which is remarkable for C&D source material.",
    createdAt: "2026-02-18T11:00:00Z",
  },
  {
    id: "rev-005",
    materialId: "mat-005",
    orderId: "ORD-20260210-005",
    buyerName: "Kumar Builders",
    buyerType: "Small Builder",
    materialQuality: 4,
    gradeAccuracy: 3,
    deliveryPunctuality: 4,
    comment:
      "Good sturdy beams for our site setup. A few pieces were smaller than listed but for the price it's very fair. Would buy again.",
    createdAt: "2026-02-12T08:00:00Z",
  },
];

export function getReviewsForMaterial(materialId: string): Review[] {
  return reviews.filter((r) => r.materialId === materialId);
}

export function getAverageRatings(materialId: string) {
  const mReviews = getReviewsForMaterial(materialId);
  if (mReviews.length === 0) return null;
  return {
    materialQuality: mReviews.reduce((s, r) => s + r.materialQuality, 0) / mReviews.length,
    gradeAccuracy: mReviews.reduce((s, r) => s + r.gradeAccuracy, 0) / mReviews.length,
    deliveryPunctuality:
      mReviews.reduce((s, r) => s + r.deliveryPunctuality, 0) / mReviews.length,
    count: mReviews.length,
  };
}
