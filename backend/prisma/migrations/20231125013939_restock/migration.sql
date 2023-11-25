-- CreateTable
CREATE TABLE "Restock" (
    "id" SERIAL NOT NULL,
    "idRestock" TEXT NOT NULL,
    "restockDate" TIMESTAMP(3) NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "totalSpend" INTEGER NOT NULL,

    CONSTRAINT "Restock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnRestock" (
    "productId" INTEGER NOT NULL,
    "restockId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductsOnRestock_pkey" PRIMARY KEY ("productId","restockId")
);

-- AddForeignKey
ALTER TABLE "ProductsOnRestock" ADD CONSTRAINT "ProductsOnRestock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnRestock" ADD CONSTRAINT "ProductsOnRestock_restockId_fkey" FOREIGN KEY ("restockId") REFERENCES "Restock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
