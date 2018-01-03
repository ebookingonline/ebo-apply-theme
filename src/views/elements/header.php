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

    $bundle = Yii::$app->applyTheme->register($this);
    $themeUrl = $bundle->baseUrl;
    $homeUrl = Yii::$app->getHomeUrl();
    if (!isset($content)) $content = '';
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>