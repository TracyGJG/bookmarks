<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="xml" omit-xml-declaration="yes" encoding="UTF-8" indent="yes"/>

	<xsl:template match="/*">
		<!--
<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
-->
		<html lang="en">
  		<head>
    		<meta charset="UTF-8" />
    		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		    <title>Personal Bookmarks</title>
				<link rel='shortcut icon' href='favicon.ico' type='img/x-icon' />
				<link rel='icon' href='favicon.ico' type='img/x-icon' />
				<link rel="stylesheet" type="text/css" href="Styles/VP.css"/>
				<link rel="stylesheet" type="text/css" href="Styles/Themes.css"/>
			</head>
			<body class=''>
				<main class='main_menu'>
					<section class='header'>
						<h1>
							<span class='controls left'>
								<div class='c01' title='General Links'></div>
								<div class='c02' title='Development Links'></div>
								<div class='c04' title='Dev On-line Tools'></div>
								<div class='c03' title='Web Dev Tools 1'></div>
								<div class='c16' title='Web Dev Tools 2'></div>
								<div class='c06' title='Personal Links'></div>
							</span>
							<span class='controls right'>
								<div class='c14' title='Link Search'></div>
								<div class='c05' title='WebMail Links'></div>
								<div class='c17' title='Spotify'></div>
								<div class='c10' title='Pocket'></div>
								<div class='c08' title='DevTo'></div>
								<div class='c15' title='Flipboard'></div>
							</span>
							<span class='header'>header</span>
						</h1>
						<span class='quickLinks personal'>
							<div class="q9 p5"></div>
							<div class="q1 p4"></div>
							<div class="q2 p4"></div>
							<div class="q3 p4"></div>
							<div class="q4 p4"></div>
							<div class="q5 p4"></div>
							<div class="q6 p4"></div>
							<div class="q7 p4"></div>
							<div class="q8 p4"></div>
						</span>
					</section>

					<div class="bookmarkSet left">
						<h2>Quick</h2>
						<ul>
							<li>
								<p class='activeList findLink'>Find Link</p>
							</li>
							<li>
								<a target='_parent' href="https://www.google.co.uk/">Search</a>
							</li>
							<li>
								<a target='_parent' href="https://www.google.com/maps">Maps</a>
							</li>
							<li>
								<a target='_parent' href="https://www.google.com/calendar">Calendar</a>
							</li>
						</ul>
						<hr/>
						<ul>
							<li>
								<a target='_parent' href="http://mail.google.com">GMail</a>
							</li>
							<li>
								<a target='_parent' href="http://mail.yahoo.com/">Yahoo mail</a>
							</li>
							<li>
								<a target='_parent' href="http://mail.live.com">Outlook</a>
							</li>
						</ul>
						<hr/>
						<ul>
							<li>
								<a target='_parent' href="https://my.virginmedia.com/home/index">Virgin Media</a>
							</li>
							<li>
								<a target='_parent' href="https://www.mercedes-benz.co.uk/passengercars/mercedes-benz-cars/mercedes-me.html">Mercedes Me</a>
							</li>
						</ul>
						<hr class='p2'/>
						<ul class='p2'>
							<li>
								<a target='_parent' href="https://moapwad.netlify.app/">MoaPWAD</a>
							</li>
							<li>
								<a target='_parent' href="https://github.com/TracyGJG">GitHub</a>
							</li>
							<li>
								<a target='_parent' href="https://www.linkedin.com/nhome/">LinkedIn</a>
							</li>
						</ul>
					</div>

					<div class="bookmarkSet right p2">
						<h2>On-line</h2>
						<ul>
							<li>
								<a target='_parent' href="https://docs.google.com/document">Google Docs</a>
							</li>
							<li>
								<a target='_parent' href="https://join.me">Join Me</a>
							</li>
							<li>
								<a target="_parent" href="https://getpocket.com">Pocket</a>
							</li>
							<li>
								<a target='_parent' href="https://web.telegram.org">Telegram</a>
							</li>
							<li>
								<a target='_parent' href="https://www.techsmith.com/jing-tool.html">Jing</a>
							</li>
						</ul>
						<hr class='p2'/>
						<ul class='p2'>
							<li>
								<a target='_parent' href="https://drive.google.com/?tab=wo&amp;authuser=0#my-drive">Google Drive</a>
							</li>
							<li>
								<a target='_parent' href="https://onedrive.live.com/?cid=9bd4f5a7667f8feb">OneDrive</a>
							</li>
							<li>
								<a target='_parent' href="https://www.icloud.com/">iCloud</a>
							</li>
							<li>
								<a target='_parent' href="https://www.idrive.com/idrive/home/">iDrive</a>
							</li>
						</ul>
					</div>

					<xsl:apply-templates/>

				</main>

				<main class='selection Search'>
					<h1 data-selection='Search' title='Return to main menu' class='activeList'>
						<span>Search Results</span>
					</h1>
					<div class='searchResults'></div>
				</main>

				<xsl:call-template name='showBookmarkSet'/>

				<script src='Script/VP.js'></script>
			</body>
		</html>
	</xsl:template>

	<xsl:template match='BookmarkSet'>
		<div class="bookmarkSet {@priority}">
			<h2>
				<xsl:if test='count(@link) &gt; 0'>
					<xsl:attribute name='data-selection'>
						<xsl:value-of select='@link'/>
					</xsl:attribute>
					<xsl:attribute name='class'>activeList</xsl:attribute>
				</xsl:if>
				<xsl:if test='count(@title) &gt; 0'>
					<xsl:value-of select='@title'/>
				</xsl:if>
			</h2>

			<xsl:if test='count(*) &gt; 0'>
				<div class='bookmarkList'>
					<ul>
						<xsl:apply-templates>
							<xsl:sort select='@name'/>
						</xsl:apply-templates>
					</ul>
				</div>
			</xsl:if>
		</div>
	</xsl:template>

	<xsl:template match='Bookmarks'>
		<li>
			<xsl:value-of select='@name'/>
		</li>
	</xsl:template>

	<xsl:template name='showBookmarkSet'>
		<xsl:for-each select='*[count(@link) &gt; 0]'>
			<main class='selection {@link}'>
				<h1 class='activeList' title='Return to main menu' data-selection='{@link}'>
					<span>
						<xsl:value-of select='@fullTitle'/>
					</span>
				</h1>
				<xsl:for-each select='Bookmarks'>
					<xsl:sort select='@name'/>
					<div class="bookmarkSet">
						<h2>
							<xsl:value-of select='@name'/>
						</h2>
						<div class='bookmarkList'>
							<ul>
								<xsl:for-each select='*'>
									<xsl:sort select='.'/>
									<li title='{@desc}'>
										<a href='{@url}'>
											<xsl:value-of select='.'/>
										</a>
									</li>
								</xsl:for-each>
							</ul>
						</div>
					</div>
				</xsl:for-each>
			</main>
		</xsl:for-each>
	</xsl:template>

</xsl:stylesheet>
