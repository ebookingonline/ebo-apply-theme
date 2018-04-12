<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-02
    | TIME   : 01:15 AM
    */

    use yii\helpers\Html;

    /* @var $this \yii\web\View */
    /* @var $content string */

    $bundle = Yii::$app->applyTheme->register();
    $themeUrl = $bundle->baseUrl;
    $homeUrl = \yii\helpers\Url::toRoute( ['/'] ); // localize
    $homeUrl = rtrim( $homeUrl , '/' ) . '/';
    if ( !isset( $content ) ) $content = '';
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="<?= Yii::$app->services->locales->getCurrent()->getDir(); ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <title><?= Html::encode( $this->title ) ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <?php $this->head() ?>

    <!-- for ios 7 style, multi-resolution icon of 152x152 -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-barstyle" content="black-translucent">
    <link rel="apple-touch-icon" href="<?= $themeUrl; ?>/images/paperplane.svg">
    <meta name="apple-mobile-web-app-title" content="Smart">

    <!-- for Chrome on Android, multi-resolution icon of 196x196 -->
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="shortcut icon" sizes="196x196" href="<?= $themeUrl; ?>/images/paperplane.svg">
    <script>
        var smart = smart || {};
        smart.config = smart.config || {};
        smart.config.wwwroot = '<?= $homeUrl ?>';
        smart.config.tokenParam = '<?= Yii::$app->request->csrfParam; ?>';
        smart.config.token = '<?= Yii::$app->request->csrfToken; ?>';
    </script>
</head>