<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method="html" encoding="UTF-8" omit-xml-declaration="yes" standalone="yes" indent="yes" />

	<xsl:template match='/*'>
<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
<html>
	<head>
		<title>Default</title>
		<style>
			main {
			 background-color:AliceBlue;
			 padding:20px;
			 overflow: auto;
			 height: 700px;
			}
		</style>
	</head>
	<body>
		<xsl:call-template name='ShowDoc'/>
	</body>
</html>
	</xsl:template>

	<xsl:template name='ShowDoc'>
		<main>
			<xsl:call-template name='ShowEntity'>
				<xsl:with-param name='Indent' select='""' />
			</xsl:call-template>
		</main>
	</xsl:template>
	<xsl:template name='ShowEntity'>
		<xsl:param name='Indent' />
		<xsl:if test='count(*) &gt; 0'>
			<xsl:value-of select='$Indent' /><span style='color:orange;'>&lt;</span><span style='color:green;'>
			<xsl:value-of select='name()' /></span><xsl:call-template name='ShowAttrib' />
			<span style='color:orange;'>&gt;</span><br />
			<xsl:for-each select='*'>
				<xsl:call-template name='ShowEntity'>
					<xsl:with-param name='Indent' select='concat($Indent,"&#xa0;&#xa0;&#xa0;&#xa0;")' />
				</xsl:call-template>
			</xsl:for-each>
			<xsl:value-of select='$Indent' /><span style='color:orange;'>&lt;/</span><span style='color:green;'>
			<xsl:value-of select='name()' /></span><span style='color:orange;'>&gt;</span><br />
		</xsl:if>
		<xsl:if test='count(*) = 0'>
			<xsl:if test='. = ""'>
				<xsl:value-of select='$Indent' /><span style='color:red;'>&lt;</span><span style='color:green;'>
				<xsl:value-of select='name()' /></span><xsl:call-template name='ShowAttrib' />&#xa0;<span style='color:red;'>/&gt;</span><br />
			</xsl:if>
			<xsl:if test='. != ""'>
				<xsl:value-of select='$Indent' /><span style='color:red;'>&lt;</span><span style='color:green;'>
				<xsl:value-of select='name()' /></span><xsl:call-template name='ShowAttrib' /><span style='color:red;'>&gt;</span>
				<span style='color:magenta;'><xsl:value-of select='.' /></span><span style='color:red;'>&lt;/</span><span style='color:green;'>
				<xsl:value-of select='name()' /></span><span style='color:red;'>&gt;</span><br />
			</xsl:if>
		</xsl:if>
	</xsl:template>
	<xsl:template name='ShowAttrib'>
		<xsl:for-each select='attribute::*'>
			&#xa0;<span style='color:blue;'><xsl:value-of select='name()' />=&quot;</span><span style='color:black;'>
			<xsl:value-of select='.' /></span><span style='color:blue;'>&quot;</span>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
