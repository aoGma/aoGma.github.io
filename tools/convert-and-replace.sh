#!/bin/bash

IMG_DIR="./source/assets/images"
POST_DIR="./source/_posts"

echo "🔄 开始批量转换图片为 .webp..."

# 转换图片并删除原图
find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read img; do
  webp="${img%.*}.webp"
  if [ ! -f "$webp" ]; then
    cwebp -q 85 "$img" -o "$webp"
    echo "✅ 转换：$img → $webp"
  else
    echo "⚠️ 已存在：$webp"
  fi
  rm "$img"
  echo "🗑️ 删除原图：$img"
done

echo "📝 开始扫描 Markdown 引用并替换为 .webp..."

find "$POST_DIR" -type f -name "*.md" | while read md; do
  # 使用 perl 替代 sed，mac 和 linux 都兼容
  perl -pi -e 's/\.(jpg|jpeg|png)/.webp/g' "$md"
  echo "✏️ 已替换文件：$md"
done

echo "🎉 所有图片处理与 Markdown 引用更新完成！"