-- DropForeignKey
ALTER TABLE "ProductsOnRestock" DROP CONSTRAINT "ProductsOnRestock_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnRestock" DROP CONSTRAINT "ProductsOnRestock_restockId_fkey";

-- AddForeignKey
ALTER TABLE "ProductsOnRestock" ADD CONSTRAINT "ProductsOnRestock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnRestock" ADD CONSTRAINT "ProductsOnRestock_restockId_fkey" FOREIGN KEY ("restockId") REFERENCES "Restock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
