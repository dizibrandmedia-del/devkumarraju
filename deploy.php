<?php
$zipUrl = 'https://github.com/dizibrandmedia-del/devkumarraju/archive/refs/heads/main.zip';
$targetDir = '/home/u468161300/domains/devkumarraju.in/public_html';
$tmpZip = '/home/u468161300/domains/devkumarraju.in/public_html/tmp_deploy.zip';

echo "Starting deployment...\n";

$data = @file_get_contents($zipUrl);
if (!$data) {
    // Fallback to curl
    $ch = curl_init($zipUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'HostingerDeploy/1.0');
    $data = curl_exec($ch);
    curl_close($ch);
}

if (!$data) {
    die("Error: Could not download repository zip.\n");
}

file_put_contents($tmpZip, $data);
echo "Downloaded " . strlen($data) . " bytes.\n";

$zip = new ZipArchive();
if ($zip->open($tmpZip) === true) {
    for ($i = 0; $i < $zip->numFiles; $i++) {
        $name = $zip->getNameIndex($i);
        // Strip top-level directory e.g. devkumarraju-main/
        $slashPos = strpos($name, '/');
        if ($slashPos === false) continue;
        $relPath = substr($name, $slashPos + 1);
        if (empty($relPath)) continue;

        // Skip the deploy.php script itself from staying in public_html if not wanted, or keep it
        $destPath = $targetDir . '/' . $relPath;
        if (substr($name, -1) === '/') {
            if (!is_dir($destPath)) {
                mkdir($destPath, 0755, true);
            }
        } else {
            $parent = dirname($destPath);
            if (!is_dir($parent)) {
                mkdir($parent, 0755, true);
            }
            file_put_contents($destPath, $zip->getFromIndex($i));
        }
    }
    $zip->close();
    @unlink($tmpZip);
    @unlink($targetDir . '/default.php');
    echo "DEPLOYMENT_SUCCESSFUL\n";
} else {
    echo "Error: Failed to open zip archive.\n";
}
