import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  nameZh: text("name_zh").notNull(),
  nameEn: text("name_en").notNull(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const dishes = sqliteTable("dishes", {
  id: integer("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "cascade",
  }),
  nameZh: text("name_zh").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionZh: text("description_zh"),
  descriptionEn: text("description_en"),
  price: real("price").notNull(),
  imageThumbnail: text("image_thumbnail").notNull(),
  imageFull: text("image_full").notNull(),
  ingredientsZh: text("ingredients_zh"),
  ingredientsEn: text("ingredients_en"),
  allergensZh: text("allergens_zh"),
  allergensEn: text("allergens_en"),
  tags: text("tags"), // JSON string
  isFeatured: integer("is_featured").default(0),
  isAvailable: integer("is_available").default(1),
  prepTime: integer("prep_time"), // minutes
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Dish = typeof dishes.$inferSelect;
export type NewDish = typeof dishes.$inferInsert;
