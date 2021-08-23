export interface DetectedLanguage {
    name: string;
    iso6391Name: string;
    confidenceScore: number;
    warnings: [
        TextAnalyticsWarning: {
            warningCode: {};
            message: string;
        }
    ];
}

export interface SentimentConfidenceScores {
    positive: number;
    neutral: number;
    negative: number;
}

export interface TargetSentiment {
    sentiment: number;
    text: string;
    confidenceScores: SentimentConfidenceScores;
    offset: number;
    length: number;
}

export const TextSentimentEnum = [
    "positive",
    "neutral",
    "negative",
    "indifferent"
]


export interface AssessmentSentiment {
    sentiment: number;
    confidenceScores: SentimentConfidenceScores;
    text: string;
    isNegated: boolean;
    offset: number;
    length: number;
}

export interface SentenceOpinion {
    target: TargetSentiment;
    assessments: AssessmentSentiment[];
}

export interface SentenceSentiment {
    sentiment: number;
    text: string;
    confidenceScores: SentimentConfidenceScores;
    opinions: SentenceOpinion[];
    offset: number;
    length: number;
}

export interface TextAnalyticsWarning {
    warningCode: {};
    message: string;
}

export interface DocumentSentiment {
    sentiment: number;
    confidenceScores: SentimentConfidenceScores;
    sentences: SentenceSentiment[];
    warnings: TextAnalyticsWarning[];
}