<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-02
    | TIME   : 12:46 AM
    */

    include dirname(__DIR__) . '/elements/header.php';
?>
    <body>
    <div class="app">
        <?php $this->beginBody() ?>
        <div id="aside" class="app-aside fade box-shadow-x nav-expand white" aria-hidden="true">
            <div class="sidenav modal-dialog dk dark" ui-class="dark">
                <!-- sidenav top -->
                <div class="navbar lt dark" ui-class="dark">
                    <!-- brand -->
                    <a href="<?= $homeUrl; ?>" class="navbar-brand">

                        <img src="<?= $themeUrl; ?>/images/paperplane.svg" alt=".">
                        <span class="hidden-folded d-inline"><?= Yii::$app->name; ?></span>
                    </a>
                    <!-- / brand -->
                </div>

                <!-- Flex nav content -->
                <div class="flex hide-scroll">
                    <div class="scroll">
                        <div class="nav-border b-primary" data-nav="">
                            <ul class="nav">
                                <li class="nav-header">
                                    <div class="py-3">
                                        <a href="#" class="btn btn-sm success theme-accent btn-block">
                                            <i class="fa fa-fw fa-plus"></i>
                                            <span class="hidden-folded d-inline">New Project</span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            <ul class="nav bg">
                                <?= Yii::$app->services->menuBuilder->render('sidebar-navigation-bar'); ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- body start -->
        <div id="content" class="app-content box-shadow-0" role="main">
            <!-- Header -->
            <div class="content-header white  box-shadow-0" id="content-header">
                <div class="navbar navbar-expand-lg">
                    <!-- btn to toggle sidenav on small screen -->
                    <a class="d-lg-none mx-2" data-toggle="modal" data-target="#aside"
                       data-pjax-click-state="external">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                            <path d="M80 304h352v16H80zM80 248h352v16H80zM80 192h352v16H80z"></path>
                        </svg>
                    </a>
                    <!-- Page title -->
                    <div class="navbar-text nav-title flex" id="pageTitle">Blank</div>
                    <ul class="nav flex-row order-lg-2">
                        <li class="dropdown d-flex align-items-center">
                            <a href="#" data-toggle="dropdown" class="d-flex align-items-center"
                               data-pjax-click-state="anchor-empty" aria-expanded="false">
	    	        <span class="avatar w-32">
	    	          <img src="../assets/images/a1.jpg" alt="...">
	    	        </span>
                            </a>

                        </li>
                        <!-- Navarbar toggle btn -->
                        <li class="d-lg-none d-flex align-items-center">
                            <a href="#" class="mx-2" data-toggle="collapse" data-target="#navbarToggler"
                               data-pjax-click-state="anchor-empty">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                     viewBox="0 0 512 512">
                                    <path d="M64 144h384v32H64zM64 240h384v32H64zM64 336h384v32H64z"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Main -->
            <div class="content-main " id="content-main">
                <div class="p-2">
                    <?= $content; ?>
                </div>
            </div>
            <!-- Footer -->
            <div class="content-footer white " id="content-footer">
                <div class="d-flex p-3">
                    <span class="text-sm text-muted flex">© Copyright. Flatfull</span>
                    <div class="text-sm text-muted">Version 1.1.0</div>
                </div>
            </div>
        </div>
        <!-- body end -->
        <?php $this->endBody() ?>
    </div>
    </body>
    </html>
<?php $this->endPage() ?>