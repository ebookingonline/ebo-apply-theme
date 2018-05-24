<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-02
    | TIME   : 01:03 AM
    */

    /** @var \Smart\Base\View $this */

    include dirname(__DIR__) . '/elements/auth_header.php';
?>
<body>
<?php $this->beginBody() ?>

<div class="navbar light bg pos-rlt box-shadow">
    <div class="mx-auto">
        <!-- brand -->
        <a href="<?= $this->app()->request->url; ?>">
            <img src="<?= $themeUrl; ?>/images/paperplane.svg" alt=".">
            <span class="hidden-folded d-inline"><?= Yii::$app->name; ?></span>
        </a>
        <!-- / brand -->
    </div>
</div>

<!-- body start -->
<div id="content" class="app-content box-shadow-0" role="main">
    <div class="py-5 text-center w-100">
        <div class="mx-auto w-xxl w-auto-xs">
            <div><?= $this->render('/layout/content/before'); ?></div>
            <?= $content; ?>
        </div>
    </div>
</div>
<!-- body end -->

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
