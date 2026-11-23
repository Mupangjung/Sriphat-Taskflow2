-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "normalizedEmail" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CHECK (role IN ('MEMBER','ADMIN'))
);

-- CreateTable
CREATE TABLE "RefreshSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "revokedAt" DATETIME,
    "replacedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RefreshSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entityType" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "shortSummary" TEXT NOT NULL,
    "provenanceStatus" TEXT NOT NULL,
    "reviewStatus" TEXT NOT NULL,
    "reviewedDate" DATETIME,
    "nextReviewDate" DATETIME,
    "reviewerUnit" TEXT NOT NULL,
    "isSampleLabel" TEXT NOT NULL,
    "isSample" BOOLEAN NOT NULL DEFAULT true,
    "archivedAt" DATETIME,
    "version" INTEGER NOT NULL DEFAULT 1,
    "catalogOrder" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CHECK (entityType IN ('disease','procedure')), CHECK (reviewStatus IN ('verified','review-due','pending-review'))
);

-- CreateTable
CREATE TABLE "FocusDiagnosis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nandaCode" TEXT,
    "nandaEdition" TEXT NOT NULL,
    "titleTh" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "problemType" TEXT NOT NULL,
    "checkSummary" TEXT NOT NULL,
    "goalSummary" TEXT NOT NULL,
    "provenanceStatus" TEXT NOT NULL,
    "reviewStatus" TEXT NOT NULL,
    "reviewedDate" DATETIME,
    "nextReviewDate" DATETIME,
    "isSample" BOOLEAN NOT NULL DEFAULT true,
    "archivedAt" DATETIME,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CHECK (problemType IN ('actual','risk')), CHECK (reviewStatus IN ('verified','review-due','pending-review'))
);

-- CreateTable
CREATE TABLE "DiseaseFocus" (
    "diseaseId" TEXT NOT NULL,
    "focusId" TEXT NOT NULL,
    "expertOrder" INTEGER NOT NULL,
    "contextOrder" INTEGER NOT NULL,

    PRIMARY KEY ("diseaseId", "focusId"),
    CONSTRAINT "DiseaseFocus_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DiseaseFocus_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK (expertOrder > 0)
);

-- CreateTable
CREATE TABLE "AssessmentFilter" (
    "diseaseId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    PRIMARY KEY ("diseaseId", "key"),
    CONSTRAINT "AssessmentFilter_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusAssessmentFilter" (
    "diseaseId" TEXT NOT NULL,
    "focusId" TEXT NOT NULL,
    "filterKey" TEXT NOT NULL,

    PRIMARY KEY ("diseaseId", "focusId", "filterKey"),
    CONSTRAINT "FocusAssessmentFilter_diseaseId_focusId_fkey" FOREIGN KEY ("diseaseId", "focusId") REFERENCES "DiseaseFocus" ("diseaseId", "focusId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FocusAssessmentFilter_diseaseId_filterKey_fkey" FOREIGN KEY ("diseaseId", "filterKey") REFERENCES "AssessmentFilter" ("diseaseId", "key") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DiseaseFavorite" (
    "userId" TEXT NOT NULL,
    "diseaseId" TEXT NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "diseaseId"),
    CONSTRAINT "DiseaseFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DiseaseFavorite_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusFavorite" (
    "userId" TEXT NOT NULL,
    "focusId" TEXT NOT NULL,
    "diseaseId" TEXT NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "focusId"),
    CONSTRAINT "FocusFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FocusFavorite_diseaseId_focusId_fkey" FOREIGN KEY ("diseaseId", "focusId") REFERENCES "DiseaseFocus" ("diseaseId", "focusId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AbbreviationGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "abbr" TEXT NOT NULL,
    "normalizedAbbr" TEXT NOT NULL,
    "promptText" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AbbreviationOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "groupId" TEXT NOT NULL,
    "labelTh" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "codeLabel" TEXT NOT NULL,
    "targetDiseaseId" TEXT,
    "statusNote" TEXT,
    "position" INTEGER NOT NULL,
    CONSTRAINT "AbbreviationOption_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "AbbreviationGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AbbreviationOption_targetDiseaseId_fkey" FOREIGN KEY ("targetDiseaseId") REFERENCES "Disease" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CodeSystemReference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataset" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "officialLabel" TEXT NOT NULL,
    "officialUrl" TEXT NOT NULL,
    "position" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UnverifiedCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "codeSystem" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "reasonNote" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UsageEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "occurredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receivedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diseaseId" TEXT,
    "focusId" TEXT,
    "secondFocusId" TEXT,
    "searchRequestId" TEXT,
    "resultCount" INTEGER,
    "queryFingerprint" TEXT,
    "safeQueryLabel" TEXT,
    CHECK (type IN ('search','disease-open','focus-open','comparison-open','copy-success','copy-fallback')), CHECK (resultCount IS NULL OR resultCount >= 0)
);

-- CreateTable
CREATE TABLE "ContentDemand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "queryFingerprint" TEXT NOT NULL,
    "safeQueryLabel" TEXT NOT NULL,
    "suggestedAction" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GovernanceChecklistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DiseaseTerm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "diseaseId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "normalizedValue" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "DiseaseTerm_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK (kind IN ('alias','abbreviation'))
);

-- CreateTable
CREATE TABLE "DiseaseCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "diseaseId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "systemLabel" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "DiseaseCode_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DiseaseConsideration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "diseaseId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "DiseaseConsideration_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusContentItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "focusId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "FocusContentItem_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK (kind IN ('supportingCue','riskFactor','dataGuideline','actionGuideline','responseGuideline','commonPitfall'))
);

-- CreateTable
CREATE TABLE "FocusDifferential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "focusId" TEXT NOT NULL,
    "similarDiagnosis" TEXT NOT NULL,
    "howToDistinguish" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "FocusDifferential_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusReference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "focusId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "fileName" TEXT,
    "pages" TEXT,
    "position" INTEGER NOT NULL,
    CONSTRAINT "FocusReference_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusNicIntervention" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "focusId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "labelTh" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "guidelineNote" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "FocusNicIntervention_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusNocOutcome" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "focusId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "labelTh" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "FocusNocOutcome_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusEducationalExample" (
    "focusId" TEXT NOT NULL PRIMARY KEY,
    "contextNote" TEXT NOT NULL,
    "focusLabel" TEXT NOT NULL,
    "dataText" TEXT NOT NULL,
    "actionText" TEXT NOT NULL,
    "responseText" TEXT NOT NULL,
    CONSTRAINT "FocusEducationalExample_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusCompareSummary" (
    "focusId" TEXT NOT NULL PRIMARY KEY,
    "definition" TEXT NOT NULL,
    "supporting" TEXT NOT NULL,
    "distinction" TEXT NOT NULL,
    "dataFocus" TEXT NOT NULL,
    "responseFocus" TEXT NOT NULL,
    CONSTRAINT "FocusCompareSummary_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FocusIcnpNote" (
    "focusId" TEXT NOT NULL PRIMARY KEY,
    "statusLabel" TEXT NOT NULL,
    "termExample" TEXT NOT NULL,
    "disclaimer" TEXT NOT NULL,
    CONSTRAINT "FocusIcnpNote_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "FocusDiagnosis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NocIndicator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "focusNocOutcomeId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "NocIndicator_focusNocOutcomeId_fkey" FOREIGN KEY ("focusNocOutcomeId") REFERENCES "FocusNocOutcome" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_normalizedEmail_key" ON "User"("normalizedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshSession_tokenHash_key" ON "RefreshSession"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshSession_userId_expiresAt_idx" ON "RefreshSession"("userId", "expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "DiseaseFocus_diseaseId_expertOrder_key" ON "DiseaseFocus"("diseaseId", "expertOrder");

-- CreateIndex
CREATE UNIQUE INDEX "AbbreviationGroup_normalizedAbbr_key" ON "AbbreviationGroup"("normalizedAbbr");

-- CreateIndex
CREATE UNIQUE INDEX "CodeSystemReference_dataset_key" ON "CodeSystemReference"("dataset");

-- CreateIndex
CREATE UNIQUE INDEX "UnverifiedCode_codeSystem_code_entityType_key" ON "UnverifiedCode"("codeSystem", "code", "entityType");

-- CreateIndex
CREATE UNIQUE INDEX "UsageEvent_eventId_key" ON "UsageEvent"("eventId");

-- CreateIndex
CREATE INDEX "UsageEvent_type_occurredAt_idx" ON "UsageEvent"("type", "occurredAt");

-- CreateIndex
CREATE INDEX "UsageEvent_diseaseId_occurredAt_idx" ON "UsageEvent"("diseaseId", "occurredAt");

-- CreateIndex
CREATE INDEX "UsageEvent_focusId_occurredAt_idx" ON "UsageEvent"("focusId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "ContentDemand_queryFingerprint_key" ON "ContentDemand"("queryFingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "DiseaseTerm_diseaseId_kind_normalizedValue_key" ON "DiseaseTerm"("diseaseId", "kind", "normalizedValue");

-- CreateIndex
CREATE UNIQUE INDEX "DiseaseCode_diseaseId_systemLabel_edition_code_key" ON "DiseaseCode"("diseaseId", "systemLabel", "edition", "code");

-- CreateIndex
CREATE UNIQUE INDEX "DiseaseConsideration_diseaseId_position_key" ON "DiseaseConsideration"("diseaseId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "FocusContentItem_focusId_kind_position_key" ON "FocusContentItem"("focusId", "kind", "position");

-- CreateIndex
CREATE UNIQUE INDEX "FocusNicIntervention_focusId_code_edition_key" ON "FocusNicIntervention"("focusId", "code", "edition");

-- CreateIndex
CREATE UNIQUE INDEX "FocusNocOutcome_focusId_code_edition_key" ON "FocusNocOutcome"("focusId", "code", "edition");

-- CreateIndex
CREATE UNIQUE INDEX "NocIndicator_focusNocOutcomeId_position_key" ON "NocIndicator"("focusNocOutcomeId", "position");
