#!/usr/bin/env node
import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'

const INPUT_DIR = 'public/images'
const QUALITY = 85
const MAX_WIDTH = 1920

async function getFiles(dir) {
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== 'originals') {
      files.push(...await getFiles(fullPath))
    } else if (entry.isFile() && /\.(png|jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase()
  const sizeBefore = (await stat(filePath)).size

  let pipeline = sharp(filePath)
  const metadata = await pipeline.metadata()

  // Resize if too large
  if (metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true })
  }

  // Optimize based on format
  if (ext === '.png') {
    pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 })
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true })
  }

  const buffer = await pipeline.toBuffer()
  const sizeAfter = buffer.length

  // Only save if smaller
  if (sizeAfter < sizeBefore) {
    await sharp(buffer).toFile(filePath)
    const savings = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1)
    console.log(`✓ ${filePath}: ${(sizeBefore/1024).toFixed(0)}KB → ${(sizeAfter/1024).toFixed(0)}KB (-${savings}%)`)
    return sizeBefore - sizeAfter
  } else {
    console.log(`○ ${filePath}: already optimized`)
    return 0
  }
}

async function main() {
  console.log('Optimizing images...\n')

  const files = await getFiles(INPUT_DIR)
  let totalSaved = 0

  for (const file of files) {
    try {
      totalSaved += await optimizeImage(file)
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`)
    }
  }

  console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`)
}

main()
