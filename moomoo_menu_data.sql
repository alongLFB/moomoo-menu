-- 删除现有数据（如果需要重新插入）
DELETE FROM dishes;
DELETE FROM categories;

-- 插入分类数据
INSERT INTO categories (name_zh, name_en, slug, sort_order) VALUES
('凉菜', 'Cold Dishes', 'cold-dishes', 1),
('热菜', 'Hot Dishes', 'hot-dishes', 2),
('面食', 'Noodles & Pasta', 'noodles', 3),
('汤品', 'Soups', 'soups', 4),
('主食', 'Staples', 'staples', 5),
('小食', 'Snacks', 'snacks', 6);

-- 插入菜品数据
INSERT INTO dishes (
  category_id, name_zh, name_en, description_zh, description_en, 
  price, image_thumbnail, image_full, ingredients_zh, ingredients_en,
  allergens_zh, allergens_en, tags, is_featured, prep_time, sort_order
) VALUES

-- 凉菜类 (Cold Dishes) - category_id: 1
(1, '东北凉拌', 'Northeastern Cold Salad', '经典东北风味凉拌菜，清爽开胃', 'Classic Northeastern style cold salad, refreshing and appetizing', 
 28.00, 'https://imgbed.alonglfb.com/file/1737961935495_东北凉拌_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961908012_东北凉拌.JPG',
 '蔬菜、调料', 'Vegetables, seasonings',
 '可能含有麸质', 'May contain gluten', '[]', 0, 10, 1),

(1, '凉拌牛肉', 'Cold Beef', '精选牛肉配以秘制调料凉拌而成', 'Selected beef with special seasoning', 
 28.00, 'https://imgbed.alonglfb.com/file/1737961939184_凉拌牛肉_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961927191_凉拌牛肉.JPG',
 '牛肉、蔬菜、调料', 'Beef, vegetables, seasonings',
 '无', 'None', '[]', 0, 15, 2),

(1, '牛肉凉面', 'Beef Cold Noodles', '爽滑面条配牛肉丝，夏日首选', 'Smooth noodles with shredded beef, perfect for summer', 
 28.00, 'https://imgbed.alonglfb.com/file/1737961939926_牛肉凉面_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961920983_牛肉凉面.JPG',
 '面条、牛肉、蔬菜', 'Noodles, beef, vegetables',
 '麸质', 'Gluten', '[]', 0, 12, 3),

-- 热菜类 (Hot Dishes) - category_id: 2
(2, '土豆牛肉', 'Potato Beef', '嫩滑牛肉配土豆，营养丰富', 'Tender beef with potatoes, nutritious', 
 50.00, 'https://imgbed.alonglfb.com/file/1737961939783_土豆牛肉_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961905978_土豆牛肉.JPG',
 '牛肉、土豆、洋葱', 'Beef, potatoes, onions',
 '无', 'None', '[{"key": "signature", "icon": "⭐️", "labelZh": "招牌菜", "labelEn": "Signature"}]', 1, 25, 1),

(2, '地三鲜', 'Three Fresh Vegetables', '茄子、土豆、青椒的经典搭配', 'Classic combination of eggplant, potato, and green pepper', 
 28.00, 'https://imgbed.alonglfb.com/file/1737961936109_地三鲜_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961910345_地三鲜.JPG',
 '茄子、土豆、青椒', 'Eggplant, potato, green pepper',
 '无', 'None', '[]', 0, 20, 2),

(2, '家常豆腐', 'Homemade Tofu', '家常风味豆腐，口感嫩滑', 'Homestyle tofu with tender texture', 
 20.00, 'https://imgbed.alonglfb.com/file/1737961940782_家常豆腐_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961908399_家常豆腐.JPG',
 '豆腐、青椒、胡萝卜', 'Tofu, green pepper, carrot',
 '大豆', 'Soy', '[]', 0, 15, 3),

(2, '干锅土豆片', 'Dry Pot Potato Chips', '麻辣干锅土豆片，香辣可口', 'Spicy dry pot potato chips, fragrant and spicy', 
 22.00, 'https://imgbed.alonglfb.com/file/1737961943402_干锅土豆片_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961919536_干锅土豆片.JPG',
 '土豆、辣椒、花椒', 'Potato, chili, Sichuan peppercorns',
 '无', 'None', '[{"key": "spicy", "icon": "🌶️", "labelZh": "微辣", "labelEn": "Spicy"}]', 0, 18, 4),

(2, '干锅花菜', 'Dry Pot Cauliflower', '香辣干锅花菜，爽脆可口', 'Spicy dry pot cauliflower, crispy and delicious', 
 23.00, 'https://imgbed.alonglfb.com/file/1737961938546_干锅花菜_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961919887_干锅花菜.JPG',
 '花菜、辣椒、蒜', 'Cauliflower, chili, garlic',
 '无', 'None', '[{"key": "spicy", "icon": "🌶️", "labelZh": "微辣", "labelEn": "Spicy"}]', 0, 16, 5),

(2, '水煮鱼', 'Boiled Fish', '经典川菜水煮鱼，鲜辣开胃', 'Classic Sichuan boiled fish, fresh and spicy', 
 58.00, 'https://imgbed.alonglfb.com/file/1737961943135_水煮鱼_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961918461_水煮鱼.JPG',
 '鱼肉、豆芽、辣椒', 'Fish, bean sprouts, chili',
 '鱼类', 'Fish', '[{"key": "signature", "icon": "⭐️", "labelZh": "招牌菜", "labelEn": "Signature"}, {"key": "spicy", "icon": "🌶️", "labelZh": "中辣", "labelEn": "Medium Spicy"}]', 1, 30, 6),

(2, '青椒肉丝', 'Shredded Pork with Green Peppers', '经典家常菜，青椒炒肉丝', 'Classic homestyle dish, green pepper with shredded pork', 
 30.00, 'https://imgbed.alonglfb.com/file/1737961934452_青椒肉丝_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961912001_青椒肉丝.JPG',
 '猪肉、青椒、笋丝', 'Pork, green pepper, bamboo shoots',
 '无', 'None', '[]', 0, 15, 7),

(2, '鱼香肉丝', 'Fish-flavored Shredded Pork', '川菜经典鱼香肉丝，酸甜可口', 'Classic Sichuan fish-flavored shredded pork, sweet and sour', 
 32.00, 'https://imgbed.alonglfb.com/file/1737961942201_鱼香肉丝_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961903061_鱼香肉丝.JPG',
 '猪肉、木耳、胡萝卜', 'Pork, wood ear mushroom, carrot',
 '无', 'None', '[{"key": "spicy", "icon": "🌶️", "labelZh": "微辣", "labelEn": "Mild Spicy"}]', 0, 18, 8),

(2, '麻辣香锅', 'Spicy Hot Pot', '麻辣香锅，多种配菜一锅香', 'Spicy hot pot with various ingredients', 
 50.00, 'https://imgbed.alonglfb.com/file/1737961943123_麻辣香锅_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961920869_麻辣香锅.JPG',
 '多种蔬菜、肉类', 'Various vegetables and meat',
 '根据选择而定', 'Depends on selection', '[{"key": "spicy", "icon": "🌶️", "labelZh": "中辣", "labelEn": "Medium Spicy"}]', 0, 25, 9),

(2, '干煸牛肉丝', 'Stir-fried Shredded Beef', '干煸牛肉丝，香辣下饭', 'Stir-fried shredded beef, spicy and good with rice', 
 28.00, '', '',
 '牛肉、芹菜、干辣椒', 'Beef, celery, dried chili',
 '无', 'None', '[{"key": "spicy", "icon": "🌶️", "labelZh": "微辣", "labelEn": "Mild Spicy"}]', 0, 20, 10),

-- 面食类 (Noodles & Pasta) - category_id: 3
(3, '牛肉炒面', 'Beef Chow Mein', '香滑牛肉炒面，口感丰富', 'Smooth beef chow mein with rich texture', 
 25.00, 'https://imgbed.alonglfb.com/file/1737961936072_牛肉炒面_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961918697_牛肉炒面.JPG',
 '面条、牛肉、蔬菜', 'Noodles, beef, vegetables',
 '麸质', 'Gluten', '[]', 0, 15, 1),

(3, '牛肉粉', 'Beef Noodle Soup', '清香牛肉粉，汤鲜味美', 'Fragrant beef noodle soup with fresh broth', 
 28.00, 'https://imgbed.alonglfb.com/file/1737961937592_牛肉粉_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961917485_牛肉粉.JPG',
 '米粉、牛肉、青菜', 'Rice noodles, beef, vegetables',
 '无', 'None', '[]', 0, 20, 2),

-- 汤品类 (Soups) - category_id: 4
(4, '疙瘩汤', 'Pimple Soup', '家常疙瘩汤，温暖舒心', 'Homestyle pimple soup, warm and comforting', 
 32.00, 'https://imgbed.alonglfb.com/file/1737961937297_疙瘩汤_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961910754_疙瘩汤.JPG',
 '面疙瘩、鸡蛋、蔬菜', 'Flour lumps, egg, vegetables',
 '麸质、鸡蛋', 'Gluten, eggs', '[]', 0, 25, 1),

-- 小食类 (Snacks) - category_id: 6
(6, '奶香大麻花', 'Milky Hemp Flowers', '香甜奶香大麻花，酥脆可口', 'Sweet milky hemp flowers, crispy and delicious', 
 5.00, 'https://imgbed.alonglfb.com/file/1737961941885_奶香大麻花_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961900172_奶香大麻花.JPG',
 '面粉、牛奶、糖', 'Flour, milk, sugar',
 '麸质、乳制品', 'Gluten, dairy', '[]', 0, 10, 1),

(6, '馅饼', 'Pie', '香脆馅饼，多种口味可选', 'Crispy pie with various flavors available', 
 5.00, 'https://imgbed.alonglfb.com/file/1737961941791_馅饼_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961924850_馅饼.JPG',
 '面粉、馅料', 'Flour, filling',
 '麸质', 'Gluten', '[]', 0, 12, 2),

(6, '麻酱烧饼', 'Sesame Sauce Pancakes', '传统麻酱烧饼，香味浓郁', 'Traditional sesame sauce pancakes with rich aroma', 
 5.00, 'https://imgbed.alonglfb.com/file/1737961941519_麻酱烧饼_thumb.JPG', 'https://imgbed.alonglfb.com/file/1737961906115_麻酱烧饼.JPG',
 '面粉、芝麻酱', 'Flour, sesame paste',
 '麸质、芝麻', 'Gluten, sesame', '[]', 0, 8, 3),

(6, '玉米饼', 'Tortillas', '香甜玉米饼，天然美味', 'Sweet corn tortillas, naturally delicious', 
 3.00, 'https://imgbed.alonglfb.com/file/1737983976449_玉米饼_thumb.jpg', 'https://imgbed.alonglfb.com/file/1737983968964_玉米饼.jpg',
 '玉米粉、糖', 'Corn flour, sugar',
 '无', 'None', '[]', 0, 6, 4),

-- 主食类 (Staples) - category_id: 5
(5, '红糖馒头', 'Brown Sugar Steamed Buns', '香甜红糖馒头，松软香甜', 'Sweet brown sugar steamed buns, soft and sweet', 
 2.00, 'https://imgbed.alonglfb.com/file/1737983977318_红糖馒头_thumb.jpg', 'https://imgbed.alonglfb.com/file/1737983962055_红糖馒头.jpg',
 '面粉、红糖、酵母', 'Flour, brown sugar, yeast',
 '麸质', 'Gluten', '[]', 0, 8, 1);
