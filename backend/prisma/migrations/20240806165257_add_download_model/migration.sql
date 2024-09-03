-- CreateTable
CREATE TABLE "Download" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "loopId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Download_userId_loopId_key" ON "Download"("userId", "loopId");

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_loopId_fkey" FOREIGN KEY ("loopId") REFERENCES "Loops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
