<?php
/*
| Author : Ata amini
| Email  : ata.aminie@gmail.com
| Date   : 2018-01-19
| Time   : 18:45
*/

namespace Smart\Themes\Apply\assets;

use yii\web\AssetBundle;

/**
 * Ico moon icons asset bundle
 * Class IcomoonIconsAssets
 *
 * @package Smart\Themes\Apply\assets
 */
class GlyphIconsAssets extends AssetBundle
{
    // style files
    public $css = [
        "fonts/icons/glyphicons/style.css"
    ];

    /** @inheritdoc */
    public function init()
    {
        // source path
        $this->sourcePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR;

        // parent initialize
        parent::init();
    }
}